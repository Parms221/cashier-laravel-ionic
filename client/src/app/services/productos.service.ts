import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/ProductoModel';
import { environment } from 'src/environments/environment';
import { IProducto } from '../types/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = `${environment.api_url}/api/productos`;

  constructor(private http: HttpClient) { }

  getAll(categoria = "") {
    return this.http.get<[IProducto]>(`${this.url}${categoria != "" ? "?categoria=" + categoria : ""}`);
  }

  add(producto: ProductoModel) {
    return this.http.post(this.url, producto);
  }

  edit(productoid: number, producto: ProductoModel) {
    return this.http.put(this.url + "/" + productoid, producto);
  }

  delete(productoid: number) {
    return this.http.delete(this.url + "/" + productoid);
  }


  get(slug: string) {
    return this.http.get<IProducto>(`${this.url}/${slug}`);
  }

}
