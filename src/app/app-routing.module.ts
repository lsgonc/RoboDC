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
    path: 'emotions-response/anxiety',
    loadComponent: () => import('./pages/emotions-response/anxiety/anxiety.component').then( c => c.AnxietyComponent)
  },
  {
    path: 'emotions-response/stress',
    loadComponent: () => import('./pages/emotions-response/stress/stress.component').then( c => c.StressComponent)
  },
  {
    path: 'emotions-response/insecurity',
    loadComponent: () => import('./pages/emotions-response/insecurity/insecurity.component').then( c => c.InsecurityComponent)
  },
  {
    path: 'emotions-response/tiredness/studies',
    loadComponent: () => import('./pages/emotions-response/tiredness/studies/studies.component').then( c => c.StudiesComponent)
  },
  {
    path: 'emotions-response/insomnia/studies',
    loadComponent: () => import('./pages/emotions-response/insomnia/studies/studies.component').then( c => c.InmsoniaStudiesComponent)
  },
  {
    path: 'emotions-response/anxiety/studies',
    loadComponent: () => import('./pages/emotions-response/anxiety/studies/studies.component').then( c => c.AnxietyStudiesComponent)
  },
  {
    path: 'emotions-response/stress/studies',
    loadComponent: () => import('./pages/emotions-response/stress/studies/studies.component').then( c => c.StressStudiesComponent)
  },
  {
    path: 'emotions-response/insecurity/studies',
    loadComponent: () => import('./pages/emotions-response/insecurity/studies/studies.component').then( c => c.InsecurityStudiesComponent)
  },



  {
    path: 'emotions-response/tiredness/work',
    loadComponent: () => import('./pages/emotions-response/tiredness/work/work.component').then( c => c.TirednessWorkComponent)
  },
  {
    path: 'emotions-response/insomnia/work',
    loadComponent: () => import('./pages/emotions-response/insomnia/work/work.component').then( c => c.InsomniaWorkComponent)
  },
  {
    path: 'emotions-response/anxiety/work',
    loadComponent: () => import('./pages/emotions-response/anxiety/work/work.component').then( c => c.AnxietyWorkComponent)
  },
  {
    path: 'emotions-response/stress/work',
    loadComponent: () => import('./pages/emotions-response/stress/work/work.component').then( c => c.StressWorkComponent)
  },
  {
    path: 'emotions-response/insecurity/work',
    loadComponent: () => import('./pages/emotions-response/insecurity/work/work.component').then( c => c.InsecurityWorkComponent)
  },

 
   {
    path: 'emotions-response/tiredness/routine',
    loadComponent: () => import('./pages/emotions-response/tiredness/routine/routine.component').then( c => c.TirednessRoutineComponent)
  },
  {
    path: 'emotions-response/insomnia/health',
    loadComponent: () => import('./pages/emotions-response/insomnia/health/health.component').then( c => c.InsomniaHealthComponent)
  },
  {
    path: 'emotions-response/anxiety/fear',
    loadComponent: () => import('./pages/emotions-response/anxiety/fear/fear.component').then( c => c.AnxietyFearComponent)
  },
  {
    path: 'emotions-response/stress/people',
    loadComponent: () => import('./pages/emotions-response/stress/people/people.component').then( c => c.StressPeopleComponent)
  },
  {
    path: 'emotions-response/insecurity/appearance',
    loadComponent: () => import('./pages/emotions-response/insecurity/appearance/appearance.component').then( c => c.InsecurityAppearanceComponent)
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
