import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  listaItemsCarrito: any [] = [];
  registrarForm: FormGroup;
  array_clientes: any[] = [];

  public total = 0;
  constructor(
    private toastCtrl : ToastController,
    private clientes_s : ClientesService,
    private productoService: ProductosService,
    // private pedidoVenta_s : PedidoVentaService

  ) {
    this.registrarForm = this.createFormGroup();
  }
  array_formasPago = [
    {
      idFormaPago: '0001',
      descripcion : 'EFECTIVO'
    },
    {
      idFormaPago: '0002',
      descripcion : 'TARJETA-CRÉDITO'
    },
  ];
  array_Monedas = [
    {
      idMoneda: '0001',
      descripcion : 'PENDIENTE'
    },
    {
      idMoneda: '0002',
      descripcion : 'COMPLETADA'
    },
    {
      idMoneda: '0003',
      descripcion : 'CANCELADA'
    },
    {
      idMoneda: '0004',
      descripcion : 'REEMBOLSADA'
    },
    {
      idMoneda: '0005',
      descripcion : 'FALLIDA'
    },
  ];
  createFormGroup() {
    return new FormGroup({
      cboCliente: new FormControl(null, [Validators.required]),
      cboFormaPago: new FormControl(null, [Validators.required]),
      cboMoneda: new FormControl(null, [Validators.required]),
    });
  }

  validation_messages = {
    cboCliente: [{ type: 'required', message: 'Seleccione un cliente.' }],
    cboFormaPago: [{ type: 'required', message: 'Seleccione categoria' }],
    cboMoneda: [{ type: 'required', message: 'Seleccione una moneda' }]  };

  ngOnInit() {
    this.getClientes();
    this.MuestraCarrito();

  }
  VaciarCarrito() {
    localStorage.clear();
    this.listaItemsCarrito = [];
    this.total = 0;
  }
  eliminarProductoCarrito(i: number) {
    let carritoStorage = localStorage.getItem('carrito') as string;
    let carrito = JSON.parse(carritoStorage);
    carrito.splice(i, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.MuestraCarrito();
  }
  MuestraCarrito() {
    let carritoStorage = localStorage.getItem('carrito') as string;
    let carrito = JSON.parse(carritoStorage);
    this.listaItemsCarrito = carrito;
    this.TotalCarrito();
  }
  TotalCarrito() {
    let carritoStorage = localStorage.getItem('carrito') as string;
    let carrito = JSON.parse(carritoStorage);
    let suma = 0;
    for (var i = 0; i < carrito.length; i++) {
      suma += carrito[i].precio * carrito[i].cantidad;
    }
    this.total = suma;
  }
  getClientes(){
    this.clientes_s.ObtenerTodos().subscribe((response) => {
      this.array_clientes = response;
      console.log(this.array_clientes);
    });
  }

  guardarPedidoVenta(){
      var idCliente = this.registrarForm.controls['cboCliente'].value;
      var idFormaPago = this.registrarForm.controls['cboFormaPago'].value;
      var idMoneda = this.registrarForm.controls['cboMoneda'].value;
    //  let datos : PedidoVentaModel = {
    //   idCliente: idCliente,
    //   idFormaPago: idFormaPago,
    //   idMoneda: idMoneda,
    //   total: this.total,
    //   fechaEmision : new Date().toISOString(),
    //   productos: this.listaItemsCarrito
    //  }
    //  console.log(datos);
    //  this.pedidoVenta_s.Agregar(datos).subscribe((response:any) => {
    //   console.log(response);
    // });
  }


}
