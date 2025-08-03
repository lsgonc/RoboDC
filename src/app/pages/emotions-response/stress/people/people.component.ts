import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./people.component.scss'],
})
export class StressPeopleComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
