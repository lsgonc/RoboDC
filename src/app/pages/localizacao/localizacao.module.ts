import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalizacaoPageRoutingModule } from './localizacao-routing.module';

import { LocalizacaoPage } from './localizacao.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalizacaoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [LocalizacaoPage],
})
export class LocalizacaoPageModule {}
