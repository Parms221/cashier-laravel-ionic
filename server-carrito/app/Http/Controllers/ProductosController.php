<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Laravel\Cashier\Cashier;

class ProductosController extends Controller
{

    function index(Request $request)
    {
        // TODO: Implementar Pagination
        $categoria = $request->query('categoria');

        if (isset($categoria)) {
            $productos = Producto::with("categoria")->whereHas('categoria', function ($query) use ($categoria) {
                $query->where('slug', $categoria);
            })->get();
            return response()->json($productos);
        }

        $productos = Producto::with("categoria")->get();
        return response()->json($productos);
    }

    function show(Producto $producto)
    {
        $producto->load('categoria');
        return response()->json($producto);
    }

    function testing() {
        $prices = Cashier::stripe()->prices->all();
        return response()->json($prices);
    }

}
