import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCommandePageRoutingModule } from './list-commande-routing.module';

import { ListCommandePage } from './list-commande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCommandePageRoutingModule
  ],
  declarations: [ListCommandePage]
})
export class ListCommandePageModule {}
