import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesCategoriesPage } from './mes-categories.page';

const routes: Routes = [
  {
    path: '',
    component: MesCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesCategoriesPageRoutingModule {}
