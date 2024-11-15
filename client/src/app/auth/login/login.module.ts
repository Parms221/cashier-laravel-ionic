import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { RouterLink } from '@angular/router';
import { FieldErrorComponent } from 'src/app/components/field-error/field-error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    ErrorComponent,
    RouterLink,
    FieldErrorComponent
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
