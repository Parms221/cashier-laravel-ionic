<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;
use Laravel\Cashier\Cashier;

class ProductosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch all the categories

        $tecnologia = Categoria::where('slug', 'tecnologia')->first();
        $hogar = Categoria::where('slug', 'hogar')->first();
        $deportes = Categoria::where('slug', 'deportes')->first();
        $ropa = Categoria::where('slug', 'ropa')->first();
        $juguetes = Categoria::where('slug', 'juguetes')->first();

        // Create products for the category 'Tecnología'
        $response = Cashier::stripe()->products->create([
            'name' => 'Laptop HP',
            'description' => 'Laptop HP 15.6" Intel Core i5 8GB RAM 1TB DD',
            'images' => ['http://localhost:8000/producto/laptop-hp.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 99999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Laptop HP',
            'descripcion' => 'Laptop HP 15.6" Intel Core i5 8GB RAM 1TB DD',
            'imagen' => 'http://localhost:8000/producto/laptop-hp.jpg',
            'precio' => 999.99,
            'slug' => 'laptop-hp',
            'stock' => 10,
            'categoria_id' => $tecnologia->id,
            'stripe_product_id' => $response->id,
        ]);


        $response = Cashier::stripe()->products->create([
            'name' => 'Smartphone Samsung',
            'description' => 'Smartphone Samsung Galaxy A12 6.5" 64GB 4GB RAM',
            'images' => ['http://localhost:8000/producto/smartphone-samsung.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 19999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Smartphone Samsung',
            'descripcion' => 'Smartphone Samsung Galaxy A12 6.5" 64GB 4GB RAM',
            'imagen' => 'http://localhost:8000/producto/smartphone-samsung.jpg',
            'precio' => 199.99,
            'slug' => 'smartphone-samsung',
            'stock' => 20,
            'categoria_id' => $tecnologia->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Smartwatch Apple',
            'description' => 'Smartwatch Apple Watch Series 6 40mm GPS',
            'images' => ['http://localhost:8000/producto/smartwatch-apple.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 39999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Smartwatch Apple',
            'descripcion' => 'Smartwatch Apple Watch Series 6 40mm GPS',
            'imagen' => 'http://localhost:8000/producto/smartwatch-apple.jpg',
            'precio' => 399.99,
            'slug' => 'smartwatch-apple',
            'stock' => 5,
            'categoria_id' => $tecnologia->id,
            'stripe_product_id' => $response->id,
        ]);


        $response = Cashier::stripe()->products->create([
            'name' => 'Tablet Samsung',
            'description' => 'Tablet Samsung Galaxy Tab A7 10.4" 32GB 3GB RAM',
            'images' => ['http://localhost:8000/producto/tablet-samsung.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 29999,
            ],
        ]);

        // Create products for the category 'Hogar'
        Producto::create([
            'nombre' => 'Sofá',
            'descripcion' => 'Sofá de 3 plazas',
            'imagen' => 'http://localhost:8000/producto/sofa.jpg',
            'precio' => 499.99,
            'slug' => 'sofa',
            'stock' => 3,
            'categoria_id' => $hogar->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Mesa de centro',
            'description' => 'Mesa de centro de madera',
            'images' => ['http://localhost:8000/producto/mesa-centro.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 9999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Mesa de centro',
            'descripcion' => 'Mesa de centro de madera',
            'imagen' => 'http://localhost:8000/producto/mesa-centro.jpg',
            'precio' => 99.99,
            'slug' => 'mesa-centro',
            'stock' => 10,
            'categoria_id' => $hogar->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Lámpara',
            'description' => 'Lámpara de pie',
            'images' => ['http://localhost:8000/producto/lampara.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 4999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Lámpara',
            'descripcion' => 'Lámpara de pie',
            'imagen' => 'http://localhost:8000/producto/lampara.jpg',
            'precio' => 49.99,
            'slug' => 'lampara',
            'stock' => 7,
            'categoria_id' => $hogar->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Cocina',
            'description' => 'Cocina de gas',
            'images' => ['http://localhost:8000/producto/cocina.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 79999,
            ],
        ]);

        // Create products for the category 'Deportes'
        Producto::create([
            'nombre' => 'Bicicleta',
            'descripcion' => 'Bicicleta de montaña',
            'imagen' => 'http://localhost:8000/producto/bicicleta.jpg',
            'precio' => 299.99,
            'slug' => 'bicicleta',
            'stock' => 5,
            'categoria_id' => $deportes->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Balón de fútbol',
            'description' => 'Balón de fútbol profesional',
            'images' => ['http://localhost:8000/producto/balon-futbol.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 1999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Balón de fútbol',
            'descripcion' => 'Balón de fútbol profesional',
            'imagen' => 'http://localhost:8000/producto/balon-futbol.jpg',
            'precio' => 19.99,
            'slug' => 'balon-futbol',
            'stock' => 15,
            'categoria_id' => $deportes->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Raqueta de tenis',
            'description' => 'Raqueta de tenis profesional',
            'images' => ['http://localhost:8000/producto/raqueta-tenis.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 4999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Raqueta de tenis',
            'descripcion' => 'Raqueta de tenis profesional',
            'imagen' => 'http://localhost:8000/producto/raqueta-tenis.jpg',
            'precio' => 49.99,
            'slug' => 'raqueta-tenis',
            'stock' => 10,
            'categoria_id' => $deportes->id,
            'stripe_product_id' => $response->id,
        ]);

        // Create products for the category 'Ropa'

        $response = Cashier::stripe()->products->create([
            'name' => 'Camisa',
            'description' => 'Camisa de vestir',
            'images' => ['http://localhost:8000/producto/camisa.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 2999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Camisa',
            'descripcion' => 'Camisa de vestir',
            'imagen' => 'http://localhost:8000/producto/camisa.jpg',
            'precio' => 29.99,
            'slug' => 'camisa',
            'stock' => 20,
            'categoria_id' => $ropa->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Pantalón',
            'description' => 'Pantalón de mezclilla',
            'images' => ['http://localhost:8000/producto/pantalon.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 3999,
            ],
        ]);


        Producto::create([
            'nombre' => 'Pantalón',
            'descripcion' => 'Pantalón de mezclilla',
            'imagen' => 'http://localhost:8000/producto/pantalon.jpg',
            'precio' => 39.99,
            'slug' => 'pantalon',
            'stock' => 15,
            'categoria_id' => $ropa->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Zapatos',
            'description' => 'Zapatos de vestir',
            'images' => ['http://localhost:8000/producto/zapatos.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 5999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Zapatos',
            'descripcion' => 'Zapatos de vestir',
            'imagen' => 'http://localhost:8000/producto/zapatos.jpg',
            'precio' => 59.99,
            'slug' => 'zapatos',
            'stock' => 10,
            'categoria_id' => $ropa->id,
            'stripe_product_id' => $response->id,
        ]);

        // Create products for the category 'Juguetes'
        $response = Cashier::stripe()->products->create([
            'name' => 'Muñeca',
            'description' => 'Muñeca Barbie',
            'images' => ['http://localhost:8000/producto/muneca.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 1999,
            ],
        ]);
        Producto::create([
            'nombre' => 'Muñeca',
            'descripcion' => 'Muñeca Barbie',
            'imagen' => 'http://localhost:8000/producto/muneca.jpg',
            'precio' => 19.99,
            'slug' => 'muneca',
            'stock' => 10,
            'categoria_id' => $juguetes->id,
            'stripe_product_id' => $response->id,
        ]);

        $response = Cashier::stripe()->products->create([
            'name' => 'Carro de control remoto',
            'description' => 'Carro de control remoto',
            'images' => ['http://localhost:8000/producto/carro-control-remoto.jpg'],
            'default_price_data' => [
                'currency' => 'pen',
                'unit_amount_decimal' => 2999,
            ],
        ]);

        Producto::create([
            'nombre' => 'Carro de control remoto',
            'descripcion' => 'Carro de control remoto',
            'imagen' => 'http://localhost:8000/producto/carro-control-remoto.jpg',
            'precio' => 29.99,
            'slug' => 'carro-control-remoto',
            'stock' => 5,
            'categoria_id' => $juguetes->id,
            'stripe_product_id' => $response->id,
        ]);
    }
}
