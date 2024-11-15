import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ClienteModel } from 'src/app/models/ProductoModel';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.page.html',
  styleUrls: ['./agregarcliente.page.scss'],
})
export class AgregarclientePage implements OnInit {
  @Input() cliente: ClienteModel | undefined;

  edit = false;
  datos = {
    nombres: '',
    ruc_dni: '',
    direccion: '',
    email: '',
  };

  createFormGroup() {
    return new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      ruc_dni: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zA-Z]{2,4}$'),
      ]),
    });
  }

  validation_messages = {
    nombres: [
      { type: 'required', message: 'El campo Nombres es requerido' },
      {
        type: 'minlength',
        message: 'El campo Nombres debe tener al menos 5 caracteres',
      },
    ],
    ruc_dni: [
      { type: 'required', message: 'El campo RUC/DNI es requerido' },
      {
        type: 'maxlength',
        message: 'El campo RUC/DNI debe tener al menos 8 caracteres',
      },
    ],
    direccion: [
      { type: 'required', message: 'El campo Direccion es requerido' },
      {
        type: 'maxlength',
        message: 'El campo Direccion debe tener al menos 100 caracteres',
      },
    ],
    email: [
      { type: 'required', message: 'El campo Email es requerido' },
      {
        type: 'pattern',
        message: 'El campo Email debe tener un formato válido',
      },
    ],
  };

  registrarForm: FormGroup;

  get nombres() {
    return this.registrarForm.get('nombres');
  }

  get ruc_dni() {
    return this.registrarForm.get('ruc_dni');
  }
  get direccion() {
    return this.registrarForm.get('direccion');
  }
  get email() {
    return this.registrarForm.get('email');
  }

  constructor(
    private service: ClientesService,
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    if (this.cliente) {
      this.edit = true;
      this.datos = this.cliente;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    if (this.edit && this.cliente) {
      this.service
        .Editar(this.cliente.cliente_id,this.cliente)
        .subscribe(() => {
          if(this.cliente){
            this.cliente.cliente_id = this.cliente.cliente_id;
            this.modalCtrl.dismiss(this.cliente, 'editado');
          }
        });
    } else {
      const cliente = this.registrarForm.value;
      this.service.Agregar(cliente).subscribe((response) => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
