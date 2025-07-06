import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
  imports: [
    TextComponent,
    ButtonComponent
  ]
})
export class PomodoroComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
