import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-study-tips',
  templateUrl: './study-tips.component.html',
  styleUrls: ['./study-tips.component.scss'],
  imports: [
    ButtonComponent,
    TextComponent
  ]
})
export class StudyTipsComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToPomodoro() {
    this.router.navigateByUrl("/feel-better/study-tips/pomodoro")
  }

}
