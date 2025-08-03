import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'localizacao',
    loadChildren: () =>
      import('./pages/localizacao/localizacao.module').then(
        (m) => m.LocalizacaoPageModule
      ),
  },
  {
    path: 'eventos',
    loadChildren: () =>
      import('./pages/eventos/eventos.module').then((m) => m.EventosPageModule),
  },
  {
    path: 'expressoes',
    loadChildren: () =>
      import('./pages/expressions/expressions.module').then((m) => m.ExpressionsPageModule),
  },
  {
    path: 'ru',
    loadChildren: () =>
      import('./pages/ru/ru.module').then((m) => m.RuPageModule),
  },
  {
    path: 'ongoing/:location',
    loadChildren: () =>
      import('./pages/ongoing/ongoing.module').then((m) => m.OngoingPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'chess',
    loadChildren: () => import('./pages/chess/chess.module').then( m => m.ChessPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'expressions',
    loadChildren: () => import('./pages/expressions/expressions.module').then( m => m.ExpressionsPageModule)
  },
  {
    path: 'controller',
    loadChildren: () => import('./pages/controller/controller.module').then( m => m.ControllerPageModule)
  },
  {
    path: 'not-well',
    loadComponent: () => import('./pages/not-well/not-well.component').then( c => c.NotWellComponent)
  },
  {
    path: 'emotions-response/tiredness',
    loadComponent: () => import('./pages/emotions-response/tiredness/tiredness.component').then( c => c.TirednessComponent)
  },
  {
    path: 'emotions-response/insomnia',
    loadComponent: () => import('./pages/emotions-response/insomnia/insomnia.component').then( c => c.InsomniaComponent)
  },
  {
    path: 'emotions-response/tiredness/studies',
    loadComponent: () => import('./pages/emotions-response/tiredness/studies/studies.component').then( c => c.StudiesComponent)
  },
  {
    path: 'jokes',
    loadComponent: () => import('./pages/jokes/jokes.component').then( c => c.JokesComponent)
  },
  {
    path: 'feel-better',
    loadComponent: () => import('./pages/feel-better/feel-better.component').then( c => c.FeelBetterComponent)
  },
  {
    path: 'feel-better/study-tips',
    loadComponent: () => import('./pages/feel-better/study-tips/study-tips.component').then( c => c.StudyTipsComponent)
  },
  {
    path: 'feel-better/study-tips/pomodoro',
    loadComponent: () => import('./pages/feel-better/study-tips/pomodoro/pomodoro.component').then( c => c.PomodoroComponent)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
