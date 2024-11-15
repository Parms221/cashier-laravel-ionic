import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdProductoPageRoutingModule } from './id-producto-routing.module';

import { IdProductoPage } from './id-producto.page';
import { CarritoButtonComponent } from 'src/app/components/layout/carrito-button/carrito-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdProductoPageRoutingModule,
    CarritoButtonComponent
  ],
  declarations: [IdProductoPage]
})
export class IdProductoPageModule {}
