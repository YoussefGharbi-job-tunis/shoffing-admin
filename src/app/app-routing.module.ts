import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/Products/add-product/add-product.module').then( m => m.AddProductPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'add-sales-units',
    loadChildren: () => import('./pages/salesUnits/add-sales-units/add-sales-units.module').then( m => m.AddSalesUnitsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'add-sales-units/:id',
    loadChildren: () => import('./pages/salesUnits/add-sales-units/add-sales-units.module').then( m => m.AddSalesUnitsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'list-sales-unit',
    loadChildren: () => import('./pages/salesUnits/list-sales-unit/list-sales-unit.module').then( m => m.ListSalesUnitPageModule)
  },
  {
    path: 'edit-product/:id',
    loadChildren: () => import('./pages/Products/edit-product/edit-product.module').then( m => m.EditProductPageModule),canActivate: [AuthGuard]
  },

  
  {
    path: 'mes-categories',
    loadChildren: () => import('./pages/Categories/mes-categories/mes-categories.module').then( m => m.MesCategoriesPageModule)
  },
  {
    path: 'add-categorie',
    loadChildren: () => import('./pages/Categories/add-categorie/add-categorie.module').then( m => m.AddCategoriePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'add-categorie/:id',
    loadChildren: () => import('./pages/Categories/add-categorie/add-categorie.module').then( m => m.AddCategoriePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'add-sous-categorie/:idCategorie',
    loadChildren: () => import('./pages/Sous-categories/add-sous-categorie/add-sous-categorie.module').then( m => m.AddSousCategoriePageModule)
  },
  {
    path: 'liste-sous-categorie/:id',
    loadChildren: () => import('./pages/Sous-categories/liste-sous-categorie/liste-sous-categorie.module').then( m => m.ListeSousCategoriePageModule)
  },
  {
    path: 'edit-sous-categorie/:idSubCat',
    loadChildren: () => import('./pages/Sous-categories/edit-sous-categorie/edit-sous-categorie.module').then( m => m.EditSousCategoriePageModule)
  },
  {
    path: 'detail-commande/:id',
    loadChildren: () => import('./pages/commande/detail-commande/detail-commande.module').then( m => m.DetailCommandePageModule)
  },
  {
    path: 'list-commande',
    loadChildren: () => import('./pages/commande/list-commande/list-commande.module').then( m => m.ListCommandePageModule)
  },


 









  
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }