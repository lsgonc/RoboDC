import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';


@Component({
  selector: 'app-feel-better',
  templateUrl: './feel-better.component.html',
  styleUrls: ['./feel-better.component.scss'],
  imports: [
    ButtonComponent,
    TextComponent
  ]
})
export class FeelBetterComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToStudyTips() {
    this.router.navigateByUrl("/feel-better/study-tips")
  }


}
