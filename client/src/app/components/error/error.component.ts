import { Component, Input, OnInit } from '@angular/core';
import { IValidationErrorResponse } from 'src/app/types/error';

@Component({
  standalone: true,
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {

  @Input() errorResponse: IValidationErrorResponse | undefined;

  constructor() { }
}
