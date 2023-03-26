import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private router: Router, private translate: TranslateService) {
    this.theme = localStorage.getItem('color-theme') ?? 'dark';
  }

  goToLocationsPage() {
    this.router.navigate(['localizacao']);
  }

  goToRUPage() {
    this.router.navigate(['ru']);
  }

  goToEventsPage() {
    this.router.navigate(['eventos']);
  }

  changeTheme(theme: string) {
    this.theme = theme;
    document.body.setAttribute('color-theme', theme);

    localStorage.setItem('color-theme', theme);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
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
