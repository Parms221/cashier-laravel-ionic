import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then( m => m.LayoutModule),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    canActivate: [guestGuard]
  },

  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'product',
  //   loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  // },
  // {
  //   path: 'categorias',
  //   loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  // },
  // {
  //   path: 'clientes',
  //   loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  // },
  // {
  //   path: 'carrito',
  //   loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
