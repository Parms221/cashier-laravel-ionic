import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductoModel } from 'src/app/models/ProductoModel';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  registrarForm: FormGroup;
  productos: ProductoModel[] = [];

  createFormGroup() {
    return new FormGroup({
      cboCliente: new FormControl(null, [Validators.required]),
      cboFormaPago: new FormControl(null, [Validators.required]),
      cboMoneda: new FormControl(null, [Validators.required]),
    });
  }

  constructor(
    private productoservice: ProductosService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    console.log("inti")
    this.productoservice.getAll().subscribe((res: any) => {
      this.productos = res.productos;
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {

  }

}
