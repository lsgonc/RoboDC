import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  goToLocationsPage() {
    this.router.navigate(['localizacao']);
  }

  goToRUPage() {
    this.router.navigate(['ru']);
  }

  goToEventsPage() {
    this.router.navigate(['eventos']);
  }
}
