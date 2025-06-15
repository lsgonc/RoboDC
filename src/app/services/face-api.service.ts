import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, timeout } from 'rxjs';
import { TtsService } from './tts.service';
import { BehaviorSubject } from 'rxjs';

declare var faceapi: any;

export const DETECTION_INTERVAL = 200;
const EXPRESSION_SAMPLES = 25;

enum EmotionsColors {
  PRIMARY = '#FF5722',
  SECONDARY = '#2196F3',
  NEUTRAL = '#9E9E9E',
}

interface ExpressionSample {
  emotion: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  modelLoadError = false;
  isLoading = false;

  currentEyesSide?: string;
  currentEmotion = '';
  emotionPorcentage = '';
  expressionColor = EmotionsColors.NEUTRAL;
  expressionMsg = '';

  currentAge = '';
  currentGender = '';
  ageAndGenderMsg = '';

  lastSendedExpression?: string;
  lastSendedEyes?: string;

  landmarkIntervals: NodeJS.Timeout[] = [];
  expressionSamples: ExpressionSample[] = [];

  firstDetectionMessageSaid = false;
  firstDetectionMessageTimestamp: number = Date.now() - 60000;
  lastChangeExpressionSended = Date.now() - 60000;

  private detectionInterval?: NodeJS.Timeout;
  private emotionSubject = new BehaviorSubject<string>('');
  emotion$ = this.emotionSubject.asObservable();


  constructor(private translate: TranslateService, private http: HttpClient, private tts: TtsService) {}

  async loadModels() {
    this.isLoading = true;
    try {
      const MODEL_URL = '/assets/models';
      console.log('Carregando modelos...');

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
      ]);

      console.log('Modelos carregados com sucesso');
    } catch (error) {
      this.modelLoadError = true;
      console.error('Erro ao carregar modelos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  setAgeAndGender(data: any) {
    this.currentGender = data?.gender;
    let msg = '';
    if (this.currentGender) {
      if (data.age <= 4) {
        msg = this.currentGender === 'male' ? 'um bebê' : 'uma bebê';
      } else if (data.age > 4 && data.age < 12) {
        msg = this.currentGender === 'male' ? 'um menininho, criança' : 'uma menininha, criança';
      } else if (data.age > 12 && data.age < 18) {
        msg = this.currentGender === 'male' ? 'um menino' : 'uma menina';
      } else if (data.age > 18 && data.age < 30) {
        msg = this.currentGender === 'male' ? 'um jovem adulto' : 'uma jovem adulta';
      } else if (data.age > 30 && data.age < 70) {
        msg = this.currentGender === 'male' ? 'um adulto' : 'uma adulta';
      } else if (data.age > 70) {
        msg = this.currentGender === 'male' ? 'um senhor de idade' : 'uma senhora de idade';
      }
      msg = `E é ${msg}`;
    }
    this.ageAndGenderMsg = msg;
  }

  setExpression(detection: any) {
    if (detection && detection.expressions) {
      this.isLoading = true;

      let mostProbEmotion = '';
      let mostProbEmotionValue = 0;

      for (const [emotion, value] of Object.entries(detection.expressions)) {
        if (!mostProbEmotion || typeof value === 'number' && value > mostProbEmotionValue) {
          mostProbEmotion = emotion;
          mostProbEmotionValue = value as number;
        }
      }

      this.expressionSamples.push({ emotion: mostProbEmotion, value: mostProbEmotionValue });

      if (this.expressionSamples.length >= EXPRESSION_SAMPLES) {
        const { emotion, value } = this.calculateAverageExpression();

        if (value > 0.95) {
          this.currentEmotion = emotion;
          this.emotionPorcentage = (value * 100).toFixed(2) + '%';
          this.expressionColor = EmotionsColors.PRIMARY;
        } else {
          this.currentEmotion = '';
          this.emotionPorcentage = '';
          this.expressionColor = EmotionsColors.NEUTRAL;
        }

        this.expressionMsg = this.currentEmotion || 'neutral';

        this.emotionSubject.next(this.currentEmotion);

        this.isLoading = false;
        this.expressionSamples = [];
      }
    } else {
      this.currentEmotion = '';
      this.emotionPorcentage = '';
      this.expressionColor = EmotionsColors.NEUTRAL;
      this.expressionMsg = 'neutral';
      this.isLoading = false;
      this.expressionSamples = [];
    }

    if (Date.now() - this.lastChangeExpressionSended > 300) {
      this.lastChangeExpressionSended = Date.now();
      this.changeRobotFace(this.currentEmotion);
    }
  }

  private calculateAverageExpression(): { emotion: string; value: number } {
    const emotionCounts: { [key: string]: { count: number; totalValue: number } } = {};

    this.expressionSamples.forEach(sample => {
      if (!emotionCounts[sample.emotion]) {
        emotionCounts[sample.emotion] = { count: 0, totalValue: 0 };
      }
      emotionCounts[sample.emotion].count++;
      emotionCounts[sample.emotion].totalValue += sample.value;
    });

    let mostFrequentEmotion = '';
    let highestAvgValue = 0;

    for (const [emotion, { count, totalValue }] of Object.entries(emotionCounts)) {
      const avgValue = totalValue / count;
      if (count > (emotionCounts[mostFrequentEmotion]?.count || 0) ||
          (count === emotionCounts[mostFrequentEmotion]?.count && avgValue > highestAvgValue)) {
        mostFrequentEmotion = emotion;
        highestAvgValue = avgValue;
      }
    }

    return { emotion: mostFrequentEmotion, value: highestAvgValue };
  }

  pauseDetection() {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = undefined;
      this.isLoading = false;
      this.expressionSamples = [];
    }
  }

  resumeDetection(videoElement: HTMLVideoElement, id?: string) {
    if (!this.detectionInterval) {
      this.onPlay(videoElement, id);
    }
  }

  async onPlay(videoElement: HTMLVideoElement, id?: string) {
    if (this.modelLoadError) {
      console.log('Erro ao carregar modelos, abortando...');
      return;
    }

    setInterval(async () => {
      const detection = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.detection) {
        if (!this.firstDetectionMessageSaid && Date.now() - this.firstDetectionMessageTimestamp > 15000) {
          this.firstDetectionMessageSaid = true;
          this.firstDetectionMessageTimestamp = Date.now();
          const randomNumber = Math.floor(Math.random() * 5) + 1;
          this.tts.speak(this.translate.instant(`detector.welcome${randomNumber}`));
        }

        const displaySize = {
          width: videoElement.width || videoElement.videoWidth,
          height: videoElement.height || videoElement.videoHeight
        };

        const x = detection.detection.box.x + detection.detection.box.width / 2;
        const sectionWidth = displaySize.width / 8;

        if (x < sectionWidth) this.currentEyesSide = '82';
        else if (x < sectionWidth * 2) this.currentEyesSide = '74';
        else if (x < sectionWidth * 3) this.currentEyesSide = '66';
        else if (x < sectionWidth * 4 || x < sectionWidth * 5) this.currentEyesSide = undefined;
        else if (x < sectionWidth * 6) this.currentEyesSide = '42';
        else if (x < sectionWidth * 7) this.currentEyesSide = '50';
        else this.currentEyesSide = '58';
      } else {
        this.firstDetectionMessageSaid = false;
      }

      this.setExpression(detection);
    }, DETECTION_INTERVAL);
  }

  async drawLandmarks(videoElement: HTMLVideoElement, canvas: HTMLCanvasElement, id?: string) {
    const displaySize = {
      width: videoElement.width || videoElement.videoWidth,
      height: videoElement.height || videoElement.videoHeight
    };

    faceapi.matchDimensions(canvas, displaySize);

    if (this.modelLoadError) {
      console.log('Erro ao carregar modelos, abortando...');
      return;
    }

    this.landmarkIntervals.push(setInterval(async () => {
      const detection = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withAgeAndGender();

      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (detection) {
        this.setAgeAndGender(detection);
        if (displaySize.width === 0 || displaySize.height === 0) {
          console.error('Dimensões do vídeo são inválidas:', displaySize);
          return;
        }

        const resizedDetections = faceapi.resizeResults(detection, displaySize);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      } else {
        this.expressionMsg = 'neutral';
      }
    }, DETECTION_INTERVAL));
  }

  clearLandmarkIntervals() {
    this.landmarkIntervals.forEach(element => clearInterval(element));
    this.landmarkIntervals = [];
  }

  changeRobotFace(expression: string) {
    if (this.lastSendedExpression === expression) return;

    this.lastSendedExpression = expression;
    let expressionValues: string[] = [];

    if (expression === 'angry') {
      expressionValues.push('26', '21');
    } else if (expression === 'disgusted') {
      expressionValues.push('26', '37');
    } else if (expression === 'fearful') {
      expressionValues.push('34', '21');
    } else if (expression === 'happy' || expression === '') {
      expressionValues.push('9');
    } else if (expression === 'sad') {
      expressionValues.push('17');
    } else if (expression === 'surprised') {
      expressionValues.push('34', '45');
    } else {
      expressionValues.push(this.currentEyesSide || '10', '37');
    }

    const robot_api = localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';
    lastValueFrom(
      this.http.post(`${robot_api}/led/changeExpression`, { expressionValues }).pipe(timeout(1000))
    ).catch(e => console.log('Erro ao enviar expressão para o robô'));
  }
}
