import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from 'robodc-ui';
import { TextComponent } from 'robodc-ui';
import { MaskedTextComponent } from 'robodc-ui';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Joke {
  setup: string;
  punchline: string;
}

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  imports: [
    ButtonComponent,
    TextComponent,
    MaskedTextComponent,
    CommonModule
  ],
  styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {

  joke: Joke | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  showPunchline: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchJoke();
  }

  fetchJoke() {
    this.isLoading = true;
    this.error = null;
    this.showPunchline = false;
    
    this.http.get<Joke>('https://official-joke-api.appspot.com/random_joke')
      .subscribe({
        next: (data) => {
          this.joke = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load joke. Please try again.';
          this.isLoading = false;
          console.error('Error fetching joke:', err);
        }
      });
  }

  revealPunchline() {
    this.showPunchline = true;
  }

  resetJoke() {
    this.fetchJoke();
  }

  goToTips() {
     this.router.navigateByUrl("/feel-better")
  }
}