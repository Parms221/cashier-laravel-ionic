import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../models/ProductoModel';
import { ClientesService } from '../services/clientes.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarclientePage } from './agregarcliente/agregarcliente.page';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: ClienteModel[] | undefined;

  constructor(
    private service: ClientesService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.service.ObtenerTodos().subscribe((response) => {
      this.clientes = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarclientePage,
    });
    modal.onDidDismiss().then((data) => {
      if (data.role === 'creado') {
        this.clientes?.push(data.data);
      }
    });
    return await modal.present();
  }

  async Editar(clientesid: number) {
    const producto = this.clientes?.find((p) => p.cliente_id === clientesid);
    const modal = await this.modalCtrl.create({
      component: AgregarclientePage,
      componentProps: {
        producto: producto,
      },
    });
    return await modal.present();
  }

  async Eliminar(clientesid: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Producto',
      message: '¿Estás seguro de eliminar este producto?',
      buttons: ['Aceptar', 'Cancelar'],
    });
    await alert.present();
    const { role } = await alert.onWillDismiss();
    if (role === 'cancel') return;
    this.service.Eliminar(clientesid).subscribe(() => {
      this.clientes = this.clientes?.filter((p) => p.cliente_id !== clientesid);
    });
  }
}
