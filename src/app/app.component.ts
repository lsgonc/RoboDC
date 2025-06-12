import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FaceApiService } from './services/face-api.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, AfterViewInit {
  videoElement!: HTMLVideoElement;

  constructor(private translate: TranslateService, public faceApi: FaceApiService) {
    this.configHandler();
    this.themeHandler();
    this.languageHandler();
  }

  async ngOnInit() {
    await this.faceApi.loadModels();
  }

  async ngAfterViewInit() {
    this.videoElement = document.getElementById('videoElement1') as HTMLVideoElement;
    this.startVideoStream();

    this.videoElement.addEventListener('playing', () => {
      this.faceApi.onPlay(this.videoElement, '1');
    });
  }

  startVideoStream() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }) // 'environment' para a câmera traseira
      .then(stream => {
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      })
      .catch(err => console.error('Erro ao acessar a câmera:', err));
  }

  themeHandler() {
    const theme = localStorage.getItem('color-theme') ?? 'dark';
    document.body.setAttribute('color-theme', theme);
  }

  languageHandler() {
    this.translate.addLangs(['en-US', 'pt-BR']);
    this.translate.setDefaultLang('pt-BR');

    const browserLang = this.translate.getBrowserLang();
    const language = browserLang?.match(/en-US|pt-BR/) ? browserLang : 'pt-BR';

    this.translate.use(localStorage.getItem('language') || language);

    localStorage.setItem(
      'language',
      localStorage.getItem('language') || language
    );
  }

  configHandler() {
    localStorage.setItem(
      'robot_api',
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000'
    );

    localStorage.setItem(
      'robot_ws',
      localStorage.getItem('robot_ws') || 'ws://192.168.1.100:9090'
    );
  }
}
