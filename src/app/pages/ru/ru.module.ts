import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RuPageRoutingModule } from './ru-routing.module';

import { RuPage } from './ru.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RuPageRoutingModule,
    TranslateModule,
  ],
  declarations: [RuPage],
})
export class RuPageModule {}
