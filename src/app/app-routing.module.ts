import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  {
    path: 'add-categorie',
    loadChildren: () => import('./pages/Categories/add-categorie/add-categorie.module').then( m => m.AddCategoriePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'list-orders',
    loadChildren: () => import('./pages/orders/list-orders/list-orders.module').then( m => m.ListOrdersPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/Products/add-product/add-product.module').then( m => m.AddProductPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'add-sales-units',
    loadChildren: () => import('./pages/add-sales-units/add-sales-units.module').then( m => m.AddSalesUnitsPageModule),canActivate: [AuthGuard]
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
    path: 'add-sous-categorie/:id',
    loadChildren: () => import('./pages/Sous-categories/add-sous-categorie/add-sous-categorie.module').then( m => m.AddSousCategoriePageModule)
  },
  {
    path: 'liste-sous-categorie/:id',
    loadChildren: () => import('./pages/Sous-categories/liste-sous-categorie/liste-sous-categorie.module').then( m => m.ListeSousCategoriePageModule)
  },








  
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }