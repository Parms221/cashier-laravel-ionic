export interface ProductoModel  {
    idproducto : number;
    descripcion : string;
    precio : number;
    cantidad : number;
    estado: number;
    categoria : CategoriaModel;
}

export interface CategoriaModel  {
    idcategoria : number;
    descripcion : string;
    estado: number;
}

export interface ClienteModel {
    cliente_id : number;
    nombres : string;
    email : string;
    ruc_dni : string;
    direccion : string;
    estado: number;
}