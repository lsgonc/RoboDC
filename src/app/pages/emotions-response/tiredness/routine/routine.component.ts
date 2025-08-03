import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./routine.component.scss'],
})
export class TirednessRoutineComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
