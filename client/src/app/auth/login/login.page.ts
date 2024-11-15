import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IValidationErrorResponse } from 'src/app/types/error';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isSubmitting = false

  serverError: IValidationErrorResponse | null = null;

  loginForm = new FormGroup({
    email: new FormControl('nuevo@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12345667', [Validators.required, Validators.minLength(6)]),
  });

  validations = {
    'email': [
      { type: 'required', message: 'Ingrese un correo electrónico' },
      { type: 'email', message: 'Ingrese un correo electrónico válido' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese una contraseña' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.isSubmitting = true
    if (!this.loginForm.valid) {
      this.isSubmitting = false
      return;
    }
    this.serverError = null

    let email = this.loginForm.value.email as string;
    let password = this.loginForm.value.password as string;

    this.authService.login(email, password).subscribe(
      {
        error: (error) => {
          console.error('Error logging in', error);
          if (error.status === 422) {
            this.serverError = error.error.errors;
          }
        },
        complete: () => {
          this.isSubmitting = false
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
