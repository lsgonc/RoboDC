import { Component, OnInit } from '@angular/core';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { DayMenu, RuApiResponseDto } from 'src/app/models/ru.types';
import { formatDate } from '@angular/common';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-ru',
    templateUrl: './ru.page.html',
    styleUrls: ['./ru.page.scss'],
    standalone: false
})
export class RuPage implements OnInit {
  public loading: boolean = false;
  public fetchError: boolean = false;

  public menus: RuApiResponseDto[] = [];
  public weekMenus: DayMenu[] = [];

  public selectedDayMenu?: DayMenu;

  constructor(
    private http: HTTP,
    private httpClient: HttpClient,
    public platform: Platform
  ) {}

  ngOnInit() {
    this.getRuApi();
  }

  async getRuApi() {
    try {
      this.loading = true;

      if (this.platform.is('hybrid')) {
        const response = await this.http.get(
          `https://petbcc.ufscar.br/ru_api/`,
          {},
          {}
        );

        this.menus = JSON.parse(response.data).filter(
          (r: RuApiResponseDto) => r.campus === 'São Carlos'
        );
      } else {
        const response = await lastValueFrom(
          this.httpClient.get<RuApiResponseDto[]>(
            `https://petbcc.ufscar.br/ru_api/`
          )
        );

        this.menus = response.filter((r) => r.campus === 'São Carlos');
      }

      this.prepareWeekMenus();
    } catch (error) {
      console.log(error);
      this.fetchError = true;
    } finally {
      this.loading = false;
    }
  }

  prepareWeekMenus() {
    const today = new Date(); // Current date
    const firstWeekDay = today.getDate() - today.getDay() + 1; // Day of the month - Day of the week + 1 (for Monday)

    let currDate = formatDate(
      new Date(today.setDate(firstWeekDay)),
      'yyyy-MM-dd',
      navigator.language
    );

    for (let i = 0; i < 5; i++) {
      const isActive = new Date().getDate() === new Date(currDate).getUTCDate();

      this.weekMenus.push({
        date: currDate,
        lunch: this.menus.find(
          (r) => r.date === currDate && r.meal_type === 'Almoço'
        ),
        dinner: this.menus.find(
          (r) => r.date === currDate && r.meal_type === 'Jantar'
        ),
        isActive,
      });

      if (isActive)
        this.selectedDayMenu = this.weekMenus[this.weekMenus.length - 1];

      const nextDate = new Date().setDate(new Date(currDate).getUTCDate() + 1);
      currDate = formatDate(nextDate, 'yyyy-MM-dd', navigator.language);
    }
  }

  getWeekDayName(date: string) {
    const weekDayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    return weekDayNames[new Date(date).getDay()];
  }

  selectWeekDay(dayMenu: DayMenu) {
    this.weekMenus.forEach((menu) => (menu.isActive = false));
    this.selectedDayMenu = dayMenu;
    dayMenu.isActive = true;
  }
}
