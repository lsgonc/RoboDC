import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FaceApiService } from 'src/app/services/face-api.service';

@Component({
  selector: 'app-expressions',
  templateUrl: './expressions.page.html',
  styleUrls: ['./expressions.page.scss'],
})
export class ExpressionsPage implements OnInit, OnDestroy {
  public loading: boolean = false;
  public error: boolean = false;

  videoElement!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;

  constructor(private router: Router, public faceApi: FaceApiService) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    this.videoElement = document.getElementById('videoElement2') as HTMLVideoElement;
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.startVideoStream();

    this.videoElement.addEventListener('playing', () => {
      this.faceApi.drawLandmarks(this.videoElement, this.canvas, '2');
    });
  }

  startVideoStream() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      })
      .catch(err => console.error('Erro ao acessar a câmera:', err));
  }

  ngOnDestroy(): void {
    this.faceApi.clearLandmarkIntervals();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  getBackgroundColor() {
    if (this.faceApi.currentEmotion !== '' && this.faceApi.currentEmotion !== 'neutral' ) return this.faceApi.expressionColor;
    return 'var(--backgroud-color)';
  }
}
