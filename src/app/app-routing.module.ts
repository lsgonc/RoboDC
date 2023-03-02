import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'aulas',
    loadChildren: () =>
      import('./pages/aulas/aulas.module').then((m) => m.AulasPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'localizacao',
    loadChildren: () => import('./pages/localizacao/localizacao.module').then( m => m.LocalizacaoPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
