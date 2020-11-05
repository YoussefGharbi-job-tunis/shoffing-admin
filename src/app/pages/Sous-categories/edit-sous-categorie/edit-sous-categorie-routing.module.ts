import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSousCategoriePage } from './edit-sous-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: EditSousCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSousCategoriePageRoutingModule {}
