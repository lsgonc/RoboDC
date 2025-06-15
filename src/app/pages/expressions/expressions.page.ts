import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonConfig } from 'robodc-ui';
import { EmotionDetectorService } from 'src/app/services/emotion-detector.service';

@Component({
  selector: 'app-expressions',
  templateUrl: './expressions.page.html',
  styleUrls: ['./expressions.page.scss'],
  standalone: false
})
export class ExpressionsPage implements OnInit, OnDestroy {
  public loading: boolean = false;
  public error: boolean = false;

  modalTitle: string = 'Sua emoção detectada foi: ';
  modalDescription: string = 'Ótimo, acabamos de captar a sua emoção! Agora, vamos te guiar para a próxima página, onde poderemos explorar um pouco mais como você está se sentindo e entender melhor o seu momento. Se você topar, temos dicas super legais, sugestões personalizadas e, claro, uma dose caprichada de piadas para trazer um sorriso ao seu rosto e animar o seu dia! Preparado para essa jornada?';
  isModalOpen: boolean = false;
  modalButtons: ButtonConfig[] = [
    { label: 'Me leve até lá!', variant: 'success', size: 'lg' },
    { label: 'Voltar', variant: 'danger', size: 'lg' }
  ];

  currentEmotion: string = '';
  analyzing: boolean = false;

  videoElement!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private emotionService: EmotionDetectorService
  ) {}

  async ngOnInit() {
    try {
      await this.emotionService.loadModels();
    } catch (error) {
      console.error('Erro ao carregar os modelos:', error);
      this.error = true;
    }

    this.subscriptions.push(
      this.emotionService.onStart.subscribe(() => {
        this.analyzing = true;
        this.currentEmotion = '';
      }),

      this.emotionService.onEmotionDetected.subscribe(emotion => {
        if (emotion) {
          this.currentEmotion = emotion;
        }
      }),

      this.emotionService.onFinish.subscribe(finalEmotion => {
        this.analyzing = false;
        this.currentEmotion = finalEmotion;
        this.openEmotionModal(finalEmotion);
      })
    );
  }

  async ngAfterViewInit() {
    this.videoElement = document.getElementById('videoElement2') as HTMLVideoElement;
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.startVideoStream();
  }

  startVideoStream() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      })
      .catch(err => {
        console.error('Erro ao acessar a câmera:', err);
        this.error = true;
      });
  }

  startDetection() {
    this.emotionService.startAnalysis(this.videoElement, 7000); // analisa por 7 segundos
  }

  stopDetection() {
    this.emotionService.stopAnalysis();
  }

  goToHome() {
    this.router.navigate(['/']);
  }



  openEmotionModal(emotion: string) {
    this.isModalOpen = true;
  }

  onModalClose() {
    this.isModalOpen = false;
  }

  onModalButtonClick(index: number) {
    this.closeModal();
    // Aqui você pode navegar ou executar qualquer ação após clicar no botão do modal
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.stopDetection();
  }
}

