import { Component, OnInit } from '@angular/core';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { HttpClient } from '@angular/common/http';

import { ruApiResponseDto } from 'src/app/models/ru.types';

@Component({
  selector: 'app-ru',
  templateUrl: './ru.page.html',
  styleUrls: ['./ru.page.scss'],
})
export class RuPage implements OnInit {
  public menus: ruApiResponseDto = [];

  constructor(private http: HTTP) {}

  ngOnInit() {
    this.getRuApi();
    /* this.getRuApi().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    }); */
  }

  async getRuApi() {
    const response = await this.http.get(
      `https://petbcc.ufscar.br/ru_api/`,
      {},
      {}
    );

    console.log(response);
    console.log(response.data);
    console.log(JSON.parse(response.data));

    /* return this.http.jsonp<ruApiResponseDto>(
      `https://petbcc.ufscar.br/ru_api/`,
      ''
    ); */
  }
}
