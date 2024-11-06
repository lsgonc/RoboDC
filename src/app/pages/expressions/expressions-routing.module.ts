import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpressionsPage } from './expressions.page';

const routes: Routes = [
  {
    path: '',
    component: ExpressionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpressionsPageRoutingModule {}
