import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaPage } from './venta.page';

const routes: Routes = [
  {
    path: '',
    component: VentaPage
  },  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaPageRoutingModule {}
