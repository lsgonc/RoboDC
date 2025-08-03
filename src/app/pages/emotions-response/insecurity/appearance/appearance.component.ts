import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./appearance.component.scss'],
})
export class InsecurityAppearanceComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
