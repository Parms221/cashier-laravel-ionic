import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IValidationErrorResponse } from 'src/app/types/error';
import { IValidations } from 'src/app/types/validations';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirm_password')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  isSubmitting = false;
  serverError: IValidationErrorResponse | null = null;

  registerForm = new FormGroup({
    name: new FormControl('Nuevo', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    email: new FormControl('nuevo@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12345667', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('12345667', [Validators.required, Validators.minLength(6)]),
  }, {
    validators: passwordMatchValidator
  });

validations: IValidations= {
    'email': [
      { type: 'required', message: 'Ingrese un correo electrónico' },
      { type: 'email', message: 'Ingrese un correo electrónico válido' },
    ],
    'password': [
      { type: 'required', message: 'Ingrese una contraseña' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' },
    ],
    'name': [
      { type: 'required', message: 'Ingrese un nombre' },
      { type: 'minlength', message: 'El nombre debe tener al menos 3 caracteres' },
      { type: 'maxlength', message: 'El nombre debe tener menos de 255 caracteres' },
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.isSubmitting = true;
    if (this.registerForm.invalid) {
      this.isSubmitting = false;
      return;
    }

    this.serverError = null;
    const name = this.registerForm.value.name as string;
    const email = this.registerForm.value.email as string;
    const password = this.registerForm.value.password as string;
    const confirm_password = this.registerForm.value.confirm_password as string;

    this.authService.register({
      name,
      email,
      password,
      password_confirmation: confirm_password
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(["/auth/login"])
      },
      error: (errorResponse) => {
        this.isSubmitting = false;
        if (errorResponse.status === 422) {
          console.log(errorResponse.error);
          this.serverError = errorResponse.error;
        }
      },
    });
    
  }
}
