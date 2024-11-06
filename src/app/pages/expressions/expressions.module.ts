import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpressionsPageRoutingModule } from './expressions-routing.module';

import { ExpressionsPage } from './expressions.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpressionsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ExpressionsPage]
})
export class ExpressionsPageModule {}
