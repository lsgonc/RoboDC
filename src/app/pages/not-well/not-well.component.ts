import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-not-well',
  templateUrl: './not-well.component.html',
  standalone: true,
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./not-well.component.scss'],
})
export class NotWellComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToTiredness() {
    console.log("alo")
    this.router.navigateByUrl("/emotions-response/tiredness")
  }

}
