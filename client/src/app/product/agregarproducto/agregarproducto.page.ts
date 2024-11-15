import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoriaModel, ProductoModel } from 'src/app/models/ProductoModel';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  edit = false;
  @Input() producto: ProductoModel | undefined;
  categorias: CategoriaModel[] | undefined;

  datos = {
    descripcion: '',
    idcategoria: '',
    precio: '',
    cantidad: '',
  };

  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      idcategoria: new FormControl(null, [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
    });
  }

  validation_messages = {
    descripcion: [{ type: 'required', message: 'Escriba Nombre.' }],
    idcategoria: [{ type: 'required', message: 'Seleccione categoria' }],
    precio: [{ type: 'required', message: 'Escriba precio' }],
    cantidad: [{ type: 'required', message: 'Escriba cantidad' }],
  };

  registrarForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private serviceproducto: ProductosService,
    private servicecategoria: CategoriaService,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    this.servicecategoria.ObtenerTodos().subscribe((response) => {
      this.categorias = response;
    });

    if (this.producto){
      this.setFormValues(this.producto);
    }
  }
 
  setFormValues(producto: ProductoModel) {
    this.registrarForm.patchValue({
      descripcion: producto.descripcion,
      idcategoria: producto.categoria.idcategoria,
      precio: producto.precio,
      cantidad: producto.cantidad,
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    if (this.producto) {
      this.serviceproducto.edit(this.producto.idproducto, this.registrarForm.value).subscribe((response) => {
        this.modalCtrl.dismiss(response, 'editado');
      });
    } else {
      const producto = this.registrarForm.value;
      this.serviceproducto.add(producto).subscribe((response) => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
