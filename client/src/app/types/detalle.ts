import { IProducto } from "./producto";

export interface IDetalleVenta {
  cantidad: number;
  producto: IProducto;
}