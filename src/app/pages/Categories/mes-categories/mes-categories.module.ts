import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesCategoriesPageRoutingModule } from './mes-categories-routing.module';

import { MesCategoriesPage } from './mes-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesCategoriesPageRoutingModule
  ],
  declarations: [MesCategoriesPage]
})
export class MesCategoriesPageModule {}
