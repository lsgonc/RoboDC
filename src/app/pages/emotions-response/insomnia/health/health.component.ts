import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./health.component.scss'],
})
export class InsomniaHealthComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
