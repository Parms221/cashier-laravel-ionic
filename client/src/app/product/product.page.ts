import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../models/ProductoModel';
import { ProductosService } from '../services/productos.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AgregarproductoPage } from './agregarproducto/agregarproducto.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productos: ProductoModel[] | undefined;

  constructor(
    private service: ProductosService,
    private modalCtrl: ModalController,
    private alertCtrl : AlertController
  ) {}

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      this.productos = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage
    })
    return await modal.present();
  }

  async Editar(productoid: number) {
    const producto = this.productos?.find(p => p.idproducto === productoid)
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage,
      componentProps: {
        producto: producto
      }
    });
    return await modal.present();
  }

  async Elimiinar(productoid: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Producto',
      message: '¿Estás seguro de eliminar este producto?',
      buttons: ['Aceptar', 'Cancelar']
    });
    await alert.present();
    const { role } = await alert.onWillDismiss();
    if (role === 'cancel') return;
    this.service.delete(productoid).subscribe(() => {
      this.productos = this.productos?.filter(p => p.idproducto !== productoid);
    });
  }
}
