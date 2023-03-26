import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  public robot_api: string = '';

  constructor() {
    this.robot_api =
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';
  }

  ngOnInit() {}

  save() {
    localStorage.setItem('robot_api', this.robot_api);
  }

  reset() {
    this.robot_api =
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';
  }
}
