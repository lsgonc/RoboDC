import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-tiredness',
  templateUrl: './insecurity.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./insecurity.component.scss'],
})
export class InsecurityComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToStudy() {
    this.router.navigateByUrl("/emotions-response/tiredness/studies");
  }
  

}
