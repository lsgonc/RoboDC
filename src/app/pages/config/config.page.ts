import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-config',
    templateUrl: './config.page.html',
    styleUrls: ['./config.page.scss'],
    standalone: false
})
export class ConfigPage implements OnInit {
  public robot_api: string = '';
  public robot_ws: string = '';

  constructor() {
    this.robot_api =
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';

    this.robot_ws =
      localStorage.getItem('robot_ws') || 'ws://192.168.1.100:9090';
  }

  ngOnInit() {}

  save() {
    localStorage.setItem('robot_api', this.robot_api);
    localStorage.setItem('robot_ws', this.robot_ws);
  }

  reset() {
    this.robot_api =
      localStorage.getItem('robot_api') || 'http://192.168.1.100:5000';
    this.robot_ws =
      localStorage.getItem('robot_ws') || 'ws://192.168.1.100:9090';
  }
}
