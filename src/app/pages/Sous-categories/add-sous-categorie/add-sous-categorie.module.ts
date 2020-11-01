import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSousCategoriePageRoutingModule } from './add-sous-categorie-routing.module';

import { AddSousCategoriePage } from './add-sous-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSousCategoriePageRoutingModule
  ],
  declarations: [AddSousCategoriePage]
})
export class AddSousCategoriePageModule {}
