import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaModel } from '../models/ProductoModel';
import { ICategoria } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url = 'http://localhost:8000/api/categorias';

  constructor(private http: HttpClient) {}

  ObtenerTodos() {
    return this.http.get<[ICategoria]>(this.url);
  }

  Agregar(categoria: CategoriaModel) {
    return this.http.post(this.url, categoria);
  }

  Editar(categoriaid: number, categoria: CategoriaModel) {
    return this.http.put(this.url + '/' + categoriaid, categoria);
  }

  Eliminar(categoriaid: number) {
    return this.http.delete(this.url + '/' + categoriaid);
  }
}
