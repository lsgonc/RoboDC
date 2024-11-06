import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TtsService } from './../../services/tts.service';
import { TranslateService } from '@ngx-translate/core';
import { FaceApiService } from 'src/app/services/face-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public theme: string = 'dark';

  public configCounter: number = 0;
  public configTimer?: NodeJS.Timeout;

  public chessCounter: number = 0;
  public chessTimer?: NodeJS.Timeout;

  constructor(
    private router: Router,
    private translate: TranslateService,
    public faceApi: FaceApiService,
    public ttsService: TtsService
  ) {
    this.theme = localStorage.getItem('color-theme') ?? 'dark';
  }

  async goToLocationsPage() {
    this.router.navigate(['localizacao']);
    await this.ttsService.speak(this.translate.instant('home.location'));
    this.ttsService.speak(this.translate.instant('locations.guideMessage'));
  }

  async goToRUPage() {
    this.router.navigate(['ru']);
    await this.ttsService.speak(this.translate.instant('ru.ruTitle'));
    this.ttsService.speak(this.translate.instant('ru.seeTheMenu'));
  }

  async goToEventsPage() {
    this.router.navigate(['eventos']);
    await this.ttsService.speak(this.translate.instant('home.events'));
    this.ttsService.speak(this.translate.instant('events.guideMessage'));
  }

  async goToExpressionsPage() {
    this.router.navigate(['expressions']);
    await this.ttsService.speak(this.translate.instant('home.expressions'));
    this.ttsService.speak(this.translate.instant('expressions.guideMessage'));
  }

  changeTheme(theme: string) {
    this.theme = theme;
    document.body.setAttribute('color-theme', theme);

    localStorage.setItem('color-theme', theme);

    if (theme === 'light') {
      this.ttsService.speak(this.translate.instant('home.lightThemeSelected'));
    } else {
      this.ttsService.speak(this.translate.instant('home.darkThemeSelected'));
    }
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);

    if (language === 'en-US') {
      this.ttsService.lang = 'en-US';
      this.ttsService.speak('English selected');
    } else {
      this.ttsService.lang = 'pt-BR';
      this.ttsService.speak('Português selecionado');
    }
  }

  changeTts(ttsIsOn: boolean) {
    this.ttsService.tssIsOn = ttsIsOn;

    if (ttsIsOn)
      this.ttsService.speak(this.translate.instant('home.audioEnabled'));
  }

  configCountdown() {
    this.configCounter++;

    if (this.configCounter === 5) {
      if (this.configTimer) clearTimeout(this.configTimer);
      this.configCounter = 0;

      this.router.navigate(['/config']);
    }

    if (this.configCounter === 1) {
      if (this.configTimer) clearTimeout(this.configTimer);

      this.configTimer = setTimeout(() => {
        this.configCounter = 0;
      }, 3000);
    }
  }

  chessCountdown() {
    this.chessCounter++;

    if (this.chessCounter === 5) {
      if (this.chessTimer) clearTimeout(this.chessTimer);
      this.chessCounter = 0;

      this.router.navigate(['/chess']);
    }

    if (this.chessCounter === 1) {
      if (this.chessTimer) clearTimeout(this.chessTimer);

      this.chessTimer = setTimeout(() => {
        this.chessCounter = 0;
      }, 3000);
    }
  }
}
