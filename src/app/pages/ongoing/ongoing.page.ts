import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { StateResponseDto } from 'src/app/models/ros.types';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.page.html',
  styleUrls: ['./ongoing.page.scss'],
})
export class OngoingPage implements OnInit {
  public location: string = 'Auditório';
  public statusInterval?: NodeJS.Timeout;

  public robot_api: string = '';

  public reachedTheGoal: boolean | null = null;
  public isGoingHome: boolean = false;

  public countdownToReturn?: NodeJS.Timeout;
  public secondsRemainToReturn = 10;

  public theme: string = 'dark';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.robot_api =
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';

    console.log(this.robot_api);
  }

  ngOnInit() {
    this.location = this.route.snapshot.params['location'];

    this.statusInterval = setInterval(() => {
      this.verifyRobotStatus();
    }, 10 * 1000); // 10 Seconds

    this.theme = localStorage.getItem('color-theme') ?? 'dark';
  }

  async verifyRobotStatus(isToHome = false) {
    const result = await lastValueFrom(
      this.http.get<StateResponseDto>(`${this.robot_api}/ros/status`)
    );

    if (result.goal_state === 'SUCCEEDED') {
      clearInterval(this.statusInterval);

      if (isToHome) {
        this.router.navigate(['/']);
        return;
      }

      this.reachedTheGoal = true;
      this.initReturnCountdown();
    } else if (
      result.goal_state === 'PREEMPTED' ||
      result.goal_state === 'ABORTED' ||
      result.goal_state === 'REJECTED' ||
      result.goal_state === 'RECALLED' ||
      result.goal_state === 'LOST'
    ) {
      this.reachedTheGoal = false;
      clearInterval(this.statusInterval);
      this.router.navigate(['/localizacao']);
    }
  }

  initReturnCountdown() {
    this.countdownToReturn = setInterval(() => {
      this.secondsRemainToReturn--;

      if (this.secondsRemainToReturn === 0) {
        this.endsReturnCountdown();
      }
    }, 1000);
  }

  endsReturnCountdown() {
    clearInterval(this.countdownToReturn);

    this.secondsRemainToReturn = 10;
    this.reachedTheGoal = null;

    this.goToHome();
  }

  async goToHome() {
    try {
      this.isGoingHome = true;

      await lastValueFrom(this.http.get(`${this.robot_api}/ros/goTo/Home`));

      this.statusInterval = setInterval(() => {
        this.verifyRobotStatus(true);
      }, 10 * 1000); // 10 Seconds
    } catch (error) {
      console.log(error);
    }
  }

  async cancelMove() {
    await lastValueFrom(this.http.delete(`${this.robot_api}/ros/cancel`));

    this.router.navigate(['/localizacao']);
  }
}
