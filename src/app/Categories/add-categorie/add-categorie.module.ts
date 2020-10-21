import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoriePageRoutingModule } from './add-categorie-routing.module';

import { AddCategoriePage } from './add-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCategoriePageRoutingModule
  ],
  declarations: [AddCategoriePage]
})
export class AddCategoriePageModule {}
