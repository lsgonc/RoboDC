import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.page.html',
  styleUrls: ['./ongoing.page.scss'],
})
export class OngoingPage implements OnInit {
  public location: string = 'Auditório';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.location = this.route.snapshot.params['location'];
  }
}
