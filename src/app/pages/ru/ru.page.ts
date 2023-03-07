import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { ruApiResponseDto } from 'src/app/models/ru.types';

@Component({
  selector: 'app-ru',
  templateUrl: './ru.page.html',
  styleUrls: ['./ru.page.scss'],
})
export class RuPage implements OnInit {
  public menus: ruApiResponseDto = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRuApi();
    /* this.getRuApi().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    }); */
  }

  async getRuApi() {
    await fetch('https://petbcc.ufscar.br/ru_api/')
      .then((r) => r.json())
      .then((j) => console.log(j));

    /* return this.http.jsonp<ruApiResponseDto>(
      `https://petbcc.ufscar.br/ru_api/`,
      ''
    ); */
  }
}
