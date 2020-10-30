import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSalesUnitsPageRoutingModule } from './add-sales-units-routing.module';

import { AddSalesUnitsPage } from './add-sales-units.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSalesUnitsPageRoutingModule
  ],
  declarations: [AddSalesUnitsPage]
})
export class AddSalesUnitsPageModule {}
