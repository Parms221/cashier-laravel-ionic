import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { CategoriasSelectComponent } from 'src/app/components/layout/categorias-select/categorias-select.component';
import { ProductosListComponent } from './partials/productos-list/productos-list.component';
import { ProductoComponent } from 'src/app/components/layout/producto/producto.component';
import { HammerModule } from '@angular/platform-browser';
import { CarritoButtonComponent } from 'src/app/components/layout/carrito-button/carrito-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    CategoriasSelectComponent,
    ProductoComponent,
    HammerModule,
    CarritoButtonComponent
  ],
  declarations: [IndexPage, ProductosListComponent]
})
export class IndexPageModule {}
