import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoriaModel } from 'src/app/models/ProductoModel';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.page.html',
  styleUrls: ['./agregarcategoria.page.scss'],
})
export class AgregarcategoriaPage implements OnInit {
  @Input() categoria: CategoriaModel | undefined;

  datos = {
    descripcion : '',
  };

  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('^[a-zA-Z ]*$'),
      ])
    });
  }

  validation_messages = {
    descripcion : [
      { type : 'required', message : 'Escriba Descripción' },
      { type : 'minlength', message : 'La descripción debe tener al menos 1 caracter' },
      { type : 'pattern', message : 'La descripción debe tener caracteres alfanuméricos' }
    ]
  };

  registrarForm: FormGroup;

  get descripcion() {
    return this.registrarForm.get('nombres');
  }

  

  constructor(
    private service: CategoriaService,
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    if (this.categoria) {
      this.datos = this.categoria;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    if (this.categoria) {
      this.service
        .Editar(this.categoria.idcategoria, this.categoria)
        .subscribe(() => {
          if(this.categoria){
            this.categoria.idcategoria = this.categoria.idcategoria;
            this.modalCtrl.dismiss(this.categoria, 'editado');
          }
        });
    } else {
      const categoria = this.registrarForm.value;
      this.service.Agregar(categoria).subscribe((response) => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
