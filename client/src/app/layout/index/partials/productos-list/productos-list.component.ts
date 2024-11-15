import { Component, OnInit } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { SelectCategoryService } from 'src/app/services/states/select-category.service';
import { IProducto } from 'src/app/types/producto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
})
export class ProductosListComponent implements OnInit {

  status: string = 'loading';
  productos: IProducto[] = [];
  categoria: string = "";

  constructor(
    private productosService: ProductosService,
    private selectCategoriaService: SelectCategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectCategoriaService.selectedCategory$.subscribe({
      next: (categoria) => {
        this.categoria = categoria;
        this.status = 'loading';
        this.productosService.getAll(this.categoria == "todos" ? "" : this.categoria)
          .subscribe(
            {
              next: (productos) => {
                this.productos = productos;
                this.status = 'success';
              },
              error: (error) => {
                this.status = 'error';
              }
            }
          );
      }
    })
  }

  productRedirect(producto: IProducto) {
    localStorage.setItem(`product-${producto.slug}`, JSON.stringify(producto));
    this.router.navigate(['producto', producto.slug]);
  }

}
