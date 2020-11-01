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
    loadChildren: () => import('./pages/Categories/add-categorie/add-categorie.module').then( m => m.AddCategoriePageModule)
  },
  {
    path: 'list-orders',
    loadChildren: () => import('./pages/orders/list-orders/list-orders.module').then( m => m.ListOrdersPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/Products/add-product/add-product.module').then( m => m.AddProductPageModule)
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