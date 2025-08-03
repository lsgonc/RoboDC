import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-fear',
  templateUrl: './fear.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./fear.component.scss'],
})
export class AnxietyFearComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
