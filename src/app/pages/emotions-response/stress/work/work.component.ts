import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./work.component.scss'],
})
export class StressWorkComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
