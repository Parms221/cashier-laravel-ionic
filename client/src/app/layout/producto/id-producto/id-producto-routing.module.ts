import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdProductoPage } from './id-producto.page';

const routes: Routes = [
  {
    path: '',
    component: IdProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdProductoPageRoutingModule {}
