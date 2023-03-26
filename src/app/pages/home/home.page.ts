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
}
