import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CarritoService } from 'src/app/services/states/carrito.service';

@Component({
  standalone: true,
  selector: 'app-carrito-button',
  templateUrl: './carrito-button.component.html',
  styleUrls: ['./carrito-button.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CarritoButtonComponent  implements OnInit {

  cantidad = 0;

  constructor(
    private carritoService: CarritoService
  ) { }

  ngOnInit() {
    this.carritoService.carrito$.subscribe({
      next: (carrito) => {
        this.cantidad = carrito.length;
      }
    });
  }

}
