import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSousCategoriePageRoutingModule } from './edit-sous-categorie-routing.module';

import { EditSousCategoriePage } from './edit-sous-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSousCategoriePageRoutingModule
  ],
  declarations: [EditSousCategoriePage]
})
export class EditSousCategoriePageModule {}
