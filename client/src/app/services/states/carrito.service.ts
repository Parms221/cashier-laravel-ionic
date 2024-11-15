import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IDetalleVenta } from 'src/app/types/detalle';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito = new BehaviorSubject<IDetalleVenta[]>([]);
  carrito$ = this.carrito.asObservable();

  constructor() {
    const carrito = localStorage.getItem('carrito');
    if (carrito) {
      this.carrito.next(JSON.parse(carrito));
    } else {
      this.carrito.next([]);
      localStorage.setItem('carrito', '[]');
    }
  }

  addProducto(detalle: IDetalleVenta) {
    const carrito = this.carrito.getValue();

    const index = carrito.findIndex((d) => d.producto.id === detalle.producto.id);

    if (index !== -1) {
      carrito[index].cantidad += detalle.cantidad;
    } else {
      carrito.push(detalle);
    }

    this.carrito.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  removeProducto(id: number) {
    const carrito = this.carrito.getValue();
    const index = carrito.findIndex((d) => d.producto.id === id);

    if (index !== -1) {
      carrito.splice(index, 1);
    }

    this.carrito.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  isProductoInCarrito(id: number) {
    return this.carrito$.pipe(
      map((carrito) => carrito.some((d) => d.producto.id === id))
    );
  }


  addToProducto(id: number) {
    const carrito = this.carrito.getValue();
    const index = carrito.findIndex((d) => d.producto.id === id);
    if (index !== -1) {
      carrito[index].cantidad++;
      this.carrito.next(carrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

  removeFromProducto(id: number) {
    const carrito = this.carrito.getValue();
    const index = carrito.findIndex((d) => d.producto.id === id);
    if (index !== -1) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      }
      this.carrito.next(carrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

}
