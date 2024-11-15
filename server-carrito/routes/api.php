<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\VentaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/categorias', [CategoriaController::class, 'index']);
    Route::get('/productos', [ProductosController::class, 'index']);
    Route::get('/productos/testing', [ProductosController::class, 'testing']);
    Route::get('/productos/{producto}', [ProductosController::class, 'show']);

    Route::post('/ventas/web', [VentaController::class, 'store_web']);
    Route::post('/ventas/mobile', [VentaController::class, 'store_mobile']);
});
