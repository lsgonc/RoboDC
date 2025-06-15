import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpressionsPageRoutingModule } from './expressions-routing.module';

import { ExpressionsPage } from './expressions.page';

import { TranslateModule } from '@ngx-translate/core';

import {TextComponent} from 'robodc-ui';
import {SpacingComponent } from 'robodc-ui';
import { AlertModalComponent } from 'robodc-ui';
import { ButtonComponent } from 'robodc-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpressionsPageRoutingModule,
    TranslateModule,
    TextComponent,
    SpacingComponent,
    AlertModalComponent,
    ButtonComponent
  ],
  declarations: [ExpressionsPage]
})
export class ExpressionsPageModule {}
