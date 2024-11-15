import { ICategoria } from "../models/categoria"

export interface IProducto {
  id: number
  nombre: string
  descripcion: string
  imagen: string
  slug: string
  categoria_id: number
  precio: string
  stock: number
  activo: number
  categoria: ICategoria
}
