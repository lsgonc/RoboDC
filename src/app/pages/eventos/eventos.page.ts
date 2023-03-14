import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { Router } from '@angular/router';
import {
  EventResponseDto,
  EventsGroupedByDay,
} from 'src/app/models/events.types';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  public events: EventsGroupedByDay = {};
  public eventsGroupsKeys: string[] = [];

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {
    this.getEvents();
  }

  async getEvents() {
    try {
      const response = await lastValueFrom(
        this.httpClient.get<EventResponseDto[]>(
          `https://api.dc.ufscar.br/api/eventos`
        )
      );

      const lastEvents = response.slice(response.length - 10);

      this.eventsGroupsKeys = lastEvents.reverse().map((i) => {
        const baseDate = new Date(i.Data).setHours(0, 0, 0, 0);
        return new Date(baseDate).toISOString();
      });

      this.events = lastEvents.reduce((acc: any, item) => {
        const baseDate = new Date(item.Data).setHours(0, 0, 0, 0);
        const key = new Date(baseDate).toISOString();

        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
    } catch (error) {
      console.log(error);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
