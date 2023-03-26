import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    const theme = localStorage.getItem('color-theme') ?? 'dark';
    document.body.setAttribute('color-theme', theme);

    this.languageHandler();
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
}
