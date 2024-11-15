# Proyecto de Ventas con Ionic y Laravel

Este proyecto es una aplicación de ventas que utiliza Ionic para el frontend y Laravel para el backend. Además, se integra con Stripe a través de Laravel Cashier para gestionar los pagos.

## Tecnologías Utilizadas

- **Ionic**: Framework para el desarrollo de aplicaciones móviles híbridas.
- **Angular**: Framework de desarrollo frontend utilizado por Ionic.
- **Laravel**: Framework de PHP para el desarrollo backend.
- **Laravel Cashier**: Paquete de Laravel para la integración con Stripe.
- **Stripe**: Plataforma de pagos en línea.

## Requisitos Previos

- Node.js y npm
- Composer
- PHP >= 8.2
- MySQL o cualquier otra base de datos compatible con Laravel

## Instalación

### Frontend (Ionic)

1. Ve al directorio del cliente:
    ```sh
    cd ./client
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura el archivo `src/environments/environment.ts` con tus claves de Stripe y la URL de la API:
    ```ts
    export const environment = {
      production: false,
      api_url: 'http://localhost:8000',
      stripe_public_api: 'tu-clave-publica-de-stripe'
    };
    ```

4. Inicia la aplicación:
    ```sh
    ionic serve
    ```

### Backend (Laravel)

1. Ve al directorio del servidor:
    ```sh
    cd ./server-carrito
    ```

2. Instala las dependencias:
    ```sh
    composer install
    ```

3. Configura el archivo `.env` con tus credenciales de base de datos y Stripe:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nombre_de_tu_base_de_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña

    STRIPE_KEY=tu-clave-publica-de-stripe
    STRIPE_SECRET=tu-clave-secreta-de-stripe
    STRIPE_WEBHOOK_SECRE=tu-clave-secreta-de-stripe-para-webhooks
    ```

4. Genera la clave de la aplicación:
    ```sh
    php artisan key:generate
    ```

5. Ejecuta las migraciones y seeders:
    ```sh
    php artisan migrate
    ```
6. Ejecuta seeders de prueba para tener datos de prueba:
    ```sh
    php artisan db:seed --class=CategoriaSeeder
    php artisan db:seed --class=ProductosSeeder
    ```

7. Inicia el servidor:
    ```sh
    php artisan serve
    ```

## Uso

1. Abre la aplicación Ionic en tu navegador o dispositivo móvil.
2. Regístrate o inicia sesión.
3. Navega por los productos y añádelos al carrito.
4. Procede al pago utilizando Stripe.

## Información Adicional

Este proyecto fue creado como parte de un trabajo académico para la Universidad Nacional de Trujillo.