import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./studies.component.scss'],
})
export class InmsoniaStudiesComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToJokes() {
    this.router.navigateByUrl("/jokes")
  }
  

}
