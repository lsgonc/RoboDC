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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
