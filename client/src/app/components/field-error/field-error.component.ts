import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IValidationErrorResponse } from 'src/app/types/error';
import { IValidations } from 'src/app/types/validations';

@Component({
  standalone: true,
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class FieldErrorComponent {

  @Input() validations: IValidations = {};
  @Input() fieldName: string = '';
  @Input() field: AbstractControl<any, any> | null = null;
  @Input() serverError: IValidationErrorResponse | null = null;

  message: string | null = null;

  constructor() {
    // this.message = this.getErrorMessasge()
   }


  getErrorMessasge(): string | null {
    if (this.serverError && Object.keys(this.serverError.errors).includes(this.fieldName)) {
      return this.serverError.errors[this.fieldName].join(', ');
    }

    if (Object.keys(this.validations).includes(this.fieldName)) {
      const list = this.validations[this.fieldName];
      for (let i = 0; i < list.length; i++) {
        if (this.field?.hasError(list[i].type)) {
          return list[i].message;
        }
      }
    }

    return null;
    

  }


}
