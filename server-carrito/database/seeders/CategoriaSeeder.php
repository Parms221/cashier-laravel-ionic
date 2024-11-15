<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::create([
            'nombre' => 'Tecnología',
            'descripcion' => 'Productos de tecnología',
            'imagen' => '/categoria/tecnologia.jpg',
            'slug' => 'tecnologia',
        ]);

        Categoria::create([
            'nombre' => 'Hogar',
            'descripcion' => 'Productos de hogar',
            'imagen' => '/categoria/hogar.jpg',
            'slug' => 'hogar',
        ]);

        Categoria::create([
            'nombre' => 'Deportes',
            'descripcion' => 'Productos de deportes',
            'imagen' => '/categoria/deportes.jpg',
            'slug' => 'deportes',
        ]);

        Categoria::create([
            'nombre' => 'Ropa',
            'descripcion' => 'Productos de ropa',
            'imagen' => '/categoria/ropa.jpg',
            'slug' => 'ropa',
        ]);

        Categoria::create([
            'nombre' => 'Juguetes',
            'descripcion' => 'Productos de juguetes',
            'imagen' => '/categoria/juguetes.jpg',
            'slug' => 'juguetes',
        ]);
    }
}
