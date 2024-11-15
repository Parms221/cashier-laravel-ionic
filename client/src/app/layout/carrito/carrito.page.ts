import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/states/carrito.service';
import { VentaService } from 'src/app/services/venta.service';
import { IDetalleVenta } from 'src/app/types/detalle';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  detalle: IDetalleVenta[] = [];
  status = "none";

  constructor(
    private carritoService: CarritoService,
    private ventaService: VentaService
  ) { }

  ngOnInit() {
    this.carritoService.carrito$.subscribe((detalle) => {
      this.detalle = detalle;
    });
  }

  total() {
    return this.detalle.reduce((acc, d) => acc + +d.producto.precio * d.cantidad, 0);
  }

  async pagar() {
    this.status = "loading";
    await this.ventaService.generateCheckoutWeb(this.detalle);
    this.status = "none";
  }


}
