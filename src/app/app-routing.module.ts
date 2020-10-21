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
  




  
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }