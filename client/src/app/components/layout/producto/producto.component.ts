import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IProducto } from 'src/app/types/producto';

@Component({
  standalone: true,
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ProductoComponent {
  @Input({required: true}) producto!: IProducto;

  constructor() { }

}
