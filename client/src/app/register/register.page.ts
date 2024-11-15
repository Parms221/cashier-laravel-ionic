import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, RegisterDTO } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { mismatch: true };
  }
  return null;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    },
  );
  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Escribir nombre' },
      { type: 'minlength', message: 'El nombre debe tener más de 3 caracteres' },
    ],
    'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'Correo no válido' },
    ],
    'password': [
      { type: 'required', message: 'Escriba su contraseña' },
      { type: 'minlength', message: 'La contraseña debe ser de más de 6 caracteres' },
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirmar contraseña' },
      { type: 'minlength', message: 'La contraseña debe ser de más de 6 caracteres' },
    ]
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router : Router,
   private alertController: AlertController
  ) {
    this.formRegister = this.createFormGroup();
  }

  ngOnInit() {}

  async register(){
    let confirmPassword = this.formRegister.value.confirmPassword;
    if (confirmPassword !== this.formRegister.value.password) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      })
      await alert.present();
      return;
    }
    
    let dto : RegisterDTO = this.formRegister.value

    this.authService.register(dto).subscribe(
      async res => {
        if(res.error){
          const alert = await this.alertController.create({
            header: 'Error',
            message : "El correo ya se encuentra registrado",
            buttons: ['Aceptar']
          })
          await alert.present();
          return;
        }
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message : "Gracias por registrarte",
          buttons: ['Aceptar']
        })
        await alert.present();

        this.router.navigate(['/login']);
      }, error => console.error(error)
    )
  }
}
