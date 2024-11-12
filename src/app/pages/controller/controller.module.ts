import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControllerPageRoutingModule } from './controller-routing.module';

import { ControllerPage } from './controller.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControllerPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ControllerPage]
})
export class ControllerPageModule {}
