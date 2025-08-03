import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-tiredness',
  templateUrl: './stress.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./stress.component.scss'],
})
export class StressComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToStudy() {
    this.router.navigateByUrl("/emotions-response/tiredness/studies");
  }
  

}
