<?php

namespace App\Http\Controllers;

use App\Http\Requests\VentaRequest;
use App\Models\Producto;
use App\Models\Venta;
use App\Models\VentaProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Cashier;

class VentaController extends Controller
{
    function store_mobile(VentaRequest $request) {
        $startTime = microtime(true);
        Log::info($request->all());

        $totalPay = 0;
        foreach ($request->productos as $producto) {
            $prod = Producto::find($producto['id']);
            $totalPay += $prod->precio * $producto['cantidad'];
        }

        $totalPayInCents = intval(round($totalPay * 100));

        $ephimeral = Cashier::stripe()->ephemeralKeys->create(
            [
                'customer' => $request->user()->stripe_id,
            ], [
                'stripe_version' => '2020-08-27'
            ]
        );

        $endTime = microtime(true);
        Log::info('ephimeral store function execution time: ' . ($endTime - $startTime) . ' seconds');

        $payment = $request->user()->pay($totalPayInCents);

        $endTime = microtime(true);
        Log::info('payment store function execution time: ' . ($endTime - $startTime) . ' seconds');

        return response()->json([
            'client_secret' => $payment->client_secret,
            'ephemeral_key' => $ephimeral->secret,
            'customer_id' => $request->user()->stripe_id,
        ]);
    }

    function store_web(VentaRequest $request) {
        $productsID = [];
        foreach ($request->productos as $producto) {
            $prod = Producto::find($producto['id']);
            $productsID[$prod->stripe_price_id] = $producto['cantidad'];
        }

        $response = $request->user()->checkout($productsID, [
            'success_url' => env('FRONTEND_URL') . '/venta/success',
            'cancel_url' => env('FRONTEND_URL') . '/venta/cancel',
        ]);

        $venta = Venta::create([
            'user_id' => $request->user()->id,
            'session_id' => $response->id,
            'status' => 'pending',
        ]);

        foreach ($request->productos as $producto) {
            $prod = Producto::find($producto['id']);
            VentaProducto::create([
                'venta_id' => $venta->id,
                'producto_id' => $prod->id,
                'cantidad' => $producto['cantidad'],
                'precio' => $prod->precio,
            ]);
        }

        // return response()->json($response);

        return response()->json([
            'redirect_url' => $response->url,
        ]);
    }

}
