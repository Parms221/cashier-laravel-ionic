import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/states/carrito.service';
import { IProducto } from 'src/app/types/producto';

@Component({
  selector: 'app-id-producto',
  templateUrl: './id-producto.page.html',
  styleUrls: ['./id-producto.page.scss'],
})
export class IdProductoPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private carritoService: CarritoService,
  ) { }

  status = "loading";
  producto: IProducto | null = null;
  cantidad = 1;
  inCarrito = false

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('idProducto') as string;

    const jsonString = localStorage.getItem(`product-${slug}`);

    if (jsonString) {
      this.producto = JSON.parse(jsonString);
      this.carritoService.isProductoInCarrito(this.producto?.id as number).subscribe({
        next: (inCarrito) => {
          this.inCarrito = inCarrito;
        }
      });
      localStorage.removeItem(`product-${slug}`);
    }

    this.productoService.get(slug).subscribe({
      next: (data) => {
        this.producto = data;
        this.carritoService.isProductoInCarrito(this.producto?.id as number).subscribe({
          next: (inCarrito) => {
            this.inCarrito = inCarrito;
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.status = "loaded";
      }
    });

  }

  aumentar() {
    this.cantidad++;
  }

  disminuir() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarAlCarrito() {
    if (this.producto) {
      this.carritoService.addProducto({
        cantidad: this.cantidad,
        producto: this.producto
      });
    }
  }

}
