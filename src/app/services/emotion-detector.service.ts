import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

declare var faceapi: any;

@Injectable({
  providedIn: 'root'
})
export class EmotionDetectorService {
  isLoading = false;
  modelLoadError = false;
  private isAnalyzing = false;
  private detectionInterval: any;
  private emotionCounts: { [key: string]: number } = {};

  // Observables
  public onStart = new Subject<void>();
  public onEmotionDetected = new BehaviorSubject<string | null>(null);
  public onFinish = new Subject<string>();

  constructor() { }

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

  startAnalysis(videoElement: HTMLVideoElement, durationMs: number = 5000) {
    if (this.isAnalyzing) return;

    this.isAnalyzing = true;
    this.emotionCounts = {};
    this.onStart.next();

    this.detectionInterval = setInterval(async () => {
      const detection = await faceapi.detectSingleFace(
        videoElement,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      if (detection?.expressions) {
        const mostProbable = this.getMostProbableEmotion(detection.expressions);
        if (mostProbable) {
          this.incrementEmotionCount(mostProbable);
          this.onEmotionDetected.next(mostProbable);
        }
      }
    }, 500); // Executa a cada 500ms

    setTimeout(() => {
      this.stopAnalysis();
    }, durationMs);
  }

  stopAnalysis() {
    if (!this.isAnalyzing) return;

    clearInterval(this.detectionInterval);
    this.isAnalyzing = false;

    const dominantEmotion = this.getDominantEmotion();
    this.onFinish.next(dominantEmotion);
  }

  private getMostProbableEmotion(expressions: { [key: string]: number }): string | null {
    let max = 0;
    let emotion = null;

    for (const [key, value] of Object.entries(expressions)) {
      if (value > max) {
        max = value;
        emotion = key;
      }
    }

     if (emotion === 'angry') {
         emotion = 'Raiva'
      } else if (emotion === 'disgusted') {
        emotion = "Nojo"
      } else if (emotion === 'fearful') {
        emotion = "Medo"
      } else if (emotion === 'happy') {
        emotion = "Feliz"
      } else if (emotion === 'neutral') {
        emotion = "Neutro"
      } else if (emotion === 'sad') {
        emotion = "Triste"
      } else if (emotion === 'surprised') {
        emotion = "Surpreso"
      }

    return emotion;
  }

  private incrementEmotionCount(emotion: string) {
    if (!this.emotionCounts[emotion]) {
      this.emotionCounts[emotion] = 0;
    }
    this.emotionCounts[emotion]++;
  }

  private getDominantEmotion(): string {
    let maxCount = 0;
    let dominant = 'neutral'; // fallback padrão

    for (const [emotion, count] of Object.entries(this.emotionCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominant = emotion;
      }
    }

    return dominant;
  }
}

