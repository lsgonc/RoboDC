import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-tiredness',
  templateUrl: './tiredness.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./tiredness.component.scss'],
})
export class TirednessComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
  

}
