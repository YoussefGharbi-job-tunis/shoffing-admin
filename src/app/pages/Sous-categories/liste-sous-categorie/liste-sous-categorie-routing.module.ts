import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeSousCategoriePage } from './liste-sous-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: ListeSousCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeSousCategoriePageRoutingModule {}
