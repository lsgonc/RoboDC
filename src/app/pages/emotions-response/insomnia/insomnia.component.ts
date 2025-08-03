import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-tiredness',
  templateUrl: './insomnia.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./insomnia.component.scss'],
})
export class InsomniaComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
  

}
