import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var faceapi: any;

enum EmotionsColors {
  angry = '#FF0000',
  disgusted = '#228B22',
  fearful = '#8A0DE5',
  happy = '#F8E451',
  neutral = '#808080',
  sad = '#1E90FF',
  surprised = '#FF7C2B'
}

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  modelLoadError = false;

  currentEmotion = '';
  emotionPorcentage = '';
  expressionColor = EmotionsColors.neutral;
  expressionMsg = 'Sem expressão definida 👻';

  currentAge = '';
  currentGender = '';
  ageAndGenderMsg = '';

  landmarkIntervals: NodeJS.Timeout[] = [];

  showVideo = false;

  constructor(private translate: TranslateService) { }

  async loadModels() {
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
    }
  }

  setAgeAndGender(data: any) {
    this.currentGender = data?.gender;

    let msg = '';
    if (this.currentGender) {
        if (data.age <= 4) {
            msg = (this.currentGender === 'male' ? 'um bebê' : 'uma bebê');
        } else if (data.age > 4 && data.age < 12) {
            msg = (this.currentGender === 'male' ? 'um menininho, criança' : 'uma menininha, criança');
        } else if (data.age > 12 && data.age < 18) {
            msg = (this.currentGender === 'male' ? 'um menino' : 'um menina');
        } else if (data.age > 18 && data.age < 28) {
            msg = (this.currentGender === 'male' ? 'um jovem adulto' : 'um jovem adulta');
        } else if (data.age > 28 && data.age < 55) {
            msg = (this.currentGender === 'male' ? 'um adulto' : 'um adulta');
        } else if (data.age > 55) {
            msg = (this.currentGender === 'male' ? 'um senhor de idade' : 'uma senhora de idade');
        }

        msg = `E é ${msg}`;
    }

    this.ageAndGenderMsg = msg;
  }

  setExpression(detection: any) {
    if (detection) {
      let mostProbEmotion = '';
      let mostProbEmotionValue = 0;

      for (const [emotion, value] of Object.entries(detection.expressions)) {
        if (!mostProbEmotion || typeof value === 'number' && value > mostProbEmotionValue) {
          mostProbEmotion = emotion;
          mostProbEmotionValue = value as number;
        }
      }

      if (mostProbEmotionValue > 0.6) {
        this.currentEmotion = mostProbEmotion;
        this.expressionColor = EmotionsColors[mostProbEmotion as keyof typeof EmotionsColors];
        this.emotionPorcentage = (mostProbEmotionValue * 100).toFixed(2) + '%';
      }

      let expressionMsg = 'Sem expressão definida<br/>Você tá aí mesmo? 👻';

      if (this.currentEmotion === 'angry') {
          expressionMsg = (this.currentGender === 'male' ? 'Você está nervoso 😡' : 'Está nervosa 😡');
      } else if (this.currentEmotion === 'disgusted') {
          expressionMsg = 'Você está com nojo 🤮';
      } else if (this.currentEmotion === 'fearful') {
          expressionMsg = 'Você está com medo 😨';
      } else if (this.currentEmotion === 'happy') {
          expressionMsg = 'Você está feliz 😀';
      } else if (this.currentEmotion === 'neutral') {
          expressionMsg = (this.currentGender === 'male' ? 'Você está neutro 😶' : 'Está neutra 😶');
      } else if (this.currentEmotion === 'sad') {
          expressionMsg = 'Você está triste 😞';
      } else if (this.currentEmotion === 'surprised') {
          expressionMsg = (this.currentGender === 'male' ? 'Você está surpreso 😯' : 'Está surpresa 😯');
      }

      if (mostProbEmotionValue <= 0.8 && !expressionMsg.includes('neutro')) {
          if (expressionMsg.includes('está')) {
              expressionMsg = expressionMsg.replace('está', 'está um pouco');
          }
      }

      if (mostProbEmotionValue >= 0.999) {
          if (expressionMsg.includes('está') && !expressionMsg.includes('neutro')) {
              expressionMsg = expressionMsg.replace('está', 'está muito');
          }
      }

      this.expressionMsg = expressionMsg;
    } else {
      this.currentEmotion = '';
      this.emotionPorcentage = '';
    }
  }

  async onPlay(videoElement: HTMLVideoElement, id?: string) {
    /* console.log('On Play!', id); */

    if (this.modelLoadError) {
      console.log('Erro ao carregar modelos, abortando...');
      return;
    }

    setInterval(async () => {
      /* console.log('Detecting', id); */

      const detection = await faceapi.detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      this.setExpression(detection);
    }, 800);
  }

  async drawLandmarks(videoElement: HTMLVideoElement, canvas: HTMLCanvasElement, id?: string) {
    /* console.log('Draw Landmarks', id); */

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
      /* console.log('Detecting landmarks', id); */

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

        faceapi.draw.drawDetections(canvas, resizedDetections);

        const options = { boxColor: '#076CA1', label: this.translate.instant('detector.mark')};
        const box = resizedDetections.detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, options);
        drawBox.draw(canvas);

        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      } else {
        this.expressionMsg = 'Sem expressão definida<br/>Você tá aí mesmo? 👻';
      }
    }, 200));
  }

  clearLandmarkIntervals() {
    this.landmarkIntervals.forEach(element => {
      clearInterval(element);
    });
  }
}
