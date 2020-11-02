import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeSousCategoriePageRoutingModule } from './liste-sous-categorie-routing.module';

import { ListeSousCategoriePage } from './liste-sous-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeSousCategoriePageRoutingModule
  ],
  declarations: [ListeSousCategoriePage]
})
export class ListeSousCategoriePageModule {}
