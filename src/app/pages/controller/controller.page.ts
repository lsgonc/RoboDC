import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {
  public fetchError: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
