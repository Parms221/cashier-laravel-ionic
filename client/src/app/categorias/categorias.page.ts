import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../models/ProductoModel';
import { CategoriaService } from '../services/categoria.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarcategoriaPage } from './agregarcategoria/agregarcategoria.page';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: CategoriaModel[] | undefined;

  constructor(
    private service: CategoriaService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.service.ObtenerTodos().subscribe((response) => {
      this.categorias = response;
    });
  }

  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarcategoriaPage,
    });
    modal.onDidDismiss().then((data) => {
      if (data.role === 'creado') {
        this.categorias?.push(data.data);
      }
    });
    return await modal.present();
  }

  async Editar(categoriaid: number) {
    const categoria = this.categorias?.find(
      (p) => p.idcategoria === categoriaid
    );
    const modal = await this.modalCtrl.create({
      component: AgregarcategoriaPage,
      componentProps: {
        categoria: categoria,
      },
    });
    return await modal.present();
  }

  async Eliminar(categoriaid: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoría',
      message: '¿Estás seguro de eliminar esta categoría?',
      buttons: ['Aceptar', 'Cancelar'],
    });
    await alert.present();
    const { role } = await alert.onWillDismiss();
    if (role === 'cancel') return;
    this.service.Eliminar(categoriaid).subscribe(() => {
      this.categorias = this.categorias?.filter(
        (p) => p.idcategoria !== categoriaid
      );
    });
  }
}
