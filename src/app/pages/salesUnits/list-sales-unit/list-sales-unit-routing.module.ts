import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSalesUnitPage } from './list-sales-unit.page';

const routes: Routes = [
  {
    path: '',
    component: ListSalesUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSalesUnitPageRoutingModule {}
