import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/states/carrito.service';
import { IDetalleVenta } from 'src/app/types/detalle';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.scss'],
})
export class CarritoItemComponent  implements OnInit {

  @Input({required: true}) detalle!: IDetalleVenta;

  constructor(
    private carritoService: CarritoService
  ) { }

  ngOnInit() {}

  aumentar() {
    this.carritoService.addToProducto(this.detalle.producto.id);
  }

  disminuir() {
    this.carritoService.removeFromProducto(this.detalle.producto.id);
  }

  eliminar() {
    this.carritoService.removeProducto(this.detalle.producto.id);
  }

}
