import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ICategoria } from 'src/app/models/categoria';
import { CategoriaModel } from 'src/app/models/ProductoModel';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SelectCategoryService } from 'src/app/services/states/select-category.service';

@Component({
  selector: 'app-categorias-select',
  standalone: true,
  templateUrl: './categorias-select.component.html',
  styleUrls: ['./categorias-select.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class CategoriasSelectComponent implements OnInit {

  categorias: ICategoria[] | null = null;
  categoriaSeleccionada: string = '';

  constructor(
    private categoriasService: CategoriaService,
    private selectCateoriaService: SelectCategoryService
  ) { }

  ngOnInit() {
    this.categoriasService.ObtenerTodos().subscribe(categorias => {
      this.categorias = categorias;
    });

    this.selectCateoriaService.selectedCategory$.subscribe(categoria => {
      this.categoriaSeleccionada = categoria;
    });
  }

  selectCategoria(categoria: string) {
    this.selectCateoriaService.setCategory(categoria);
  }

}
