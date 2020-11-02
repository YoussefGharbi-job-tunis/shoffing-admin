import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSousCategoriePage } from './add-sous-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: AddSousCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSousCategoriePageRoutingModule {}
