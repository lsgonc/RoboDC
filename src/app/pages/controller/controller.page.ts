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

  public socket?: WebSocket = undefined;

  public isConnected: boolean = false;
  public logs: string[] = [];
  public sLinear: number = 0.1;
  public sAngular: number = 0.5;

  public robot_ws: string;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.robot_ws = localStorage.getItem('robot_ws') || 'ws://192.168.1.100:9090';
    this.logs.push(`[${new Date().toISOString()}] Robot WebSocket setted to ${this.robot_ws}`);
  }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  connect() {
    this.socket = new WebSocket(this.robot_ws);

    this.logs.push(`[${new Date().toISOString()}] Connecting to ` + this.robot_ws);

    this.socket.onopen = () => {
      this.isConnected = true;
      this.logs.push(`[${new Date().toISOString()}] Connected to ` + this.robot_ws);
    }

    this.socket.onerror = () => {
      this.isConnected = false;
      this.logs.push(`[${new Date().toISOString()}] Error connecting to ` + this.robot_ws);
    }

    this.socket.onclose = () => {
      this.isConnected = false;
      this.logs.push(`[${new Date().toISOString()}] Disconnected from ` + this.robot_ws);
    }
  }

  disconnect() {
    this.emitCmdVel(0, 0);
    this.socket?.close();
  }

  emitCmdVel(sLinear: number, sAngular: number) {
    this.logs.push(`[${new Date().toISOString()}] cmd_vel to ${sLinear}, ${sAngular}`);

    this.socket?.send(
      JSON.stringify({
        op: 'publish',
        topic: '/robot/cmd_vel',
        msg: {
          linear: {
            x: sLinear,
            y: 0,
            z: 0
          },
          angular: {
            x: 0,
            y: 0,
            z: sAngular
          }
        }
      })
    )
  }

  increaseLinear() {
    this.sLinear += 0.1;
    this.sLinear = Math.round(this.sLinear * 10) / 10;
    this.logs.push(`[${new Date().toISOString()}] Linear Speed increased to ${this.sLinear}`);
  }

  decreaseLinear() {
    this.sLinear -= 0.1;
    this.sLinear = Math.round(this.sLinear * 10) / 10;
    this.logs.push(`[${new Date().toISOString()}] Linear Speed decreased to ${this.sLinear}`);
  }

  increaseAngular() {
    this.sAngular += 0.1;
    this.sAngular = Math.round( this.sAngular * 10) / 10;
    this.logs.push(`[${new Date().toISOString()}] Angular Speed increased to ${this.sAngular}`);
  }

  decreaseAngular() {
    this.sAngular -= 0.1;
    this.sAngular = Math.round(this.sAngular * 10) / 10;
    this.logs.push(`[${new Date().toISOString()}] Angular Speed decreased to ${this.sAngular}`);
  }
}
