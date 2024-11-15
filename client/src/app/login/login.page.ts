import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' },
    ],
    'password': [
      { type: 'required', message: 'Escriba su contraseña' },
    ]
  }

  constructor(
    private router : Router,
    private authService : AuthService,
    public alertController : AlertController,
    public navCtrl : NavController,
    public formBuilder : FormBuilder
  ) {
    this.formLogin = this.createFormGroup();
  }

  ngOnInit() {}

  async login(){
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
    
    this.authService.login(email, password).subscribe(
      async response => {
        if(!response.error){
          this.navCtrl.navigateRoot('/home');
          return;
        }
        
        const alert = await this.alertController.create({
          header: 'Error',
          message: `${response.error.charAt(0).toUpperCase() + response.error.slice(1)} no válido`,
          buttons: ['Aceptar']
        })
        await alert.present();
      }, (error) => {
        console.error(error);
      }
    )
  }
}
