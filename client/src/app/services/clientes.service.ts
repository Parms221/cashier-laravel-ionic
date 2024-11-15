import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/ProductoModel';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private url = 'http://localhost:8000/api/clientes';

  constructor(private http: HttpClient) {}

  ObtenerTodos() {
    return this.http.get<[ClienteModel]>(this.url);
  }

  Agregar(cliente: ClienteModel) {
    return this.http.post(this.url, cliente);
  }

  Editar(clienteid: number, cliente: ClienteModel) {
    return this.http.put(this.url + '/' + clienteid, cliente);
  }

  Eliminar(clienteid: number) {
    return this.http.delete(this.url + '/' + clienteid);
  }
}
