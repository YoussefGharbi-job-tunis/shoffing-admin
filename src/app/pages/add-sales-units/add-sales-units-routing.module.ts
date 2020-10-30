import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSalesUnitsPage } from './add-sales-units.page';

const routes: Routes = [
  {
    path: '',
    component: AddSalesUnitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSalesUnitsPageRoutingModule {}
