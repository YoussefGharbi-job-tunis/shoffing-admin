import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCommandePage } from './list-commande.page';

const routes: Routes = [
  {
    path: '',
    component: ListCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCommandePageRoutingModule {}
