import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';

@Component({
  selector: 'app-tiredness',
  templateUrl: './anxiety.component.html',
  imports: [
    ButtonComponent,
    TextComponent
  ],
  styleUrls: ['./anxiety.component.scss'],
})
export class AnxietyComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}

  goToStudy() {
    this.router.navigateByUrl("/emotions-response/tiredness/studies");
  }
  

}
