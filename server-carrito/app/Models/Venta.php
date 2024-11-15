<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = 'venta';

    protected $fillable = [
        'user_id',
        'session_id',
        'payment_intent_id',
        'status',
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'venta_producto')
            ->withPivot('cantidad', 'precio')
            ->withTimestamps();
    }
}
