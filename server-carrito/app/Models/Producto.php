<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'producto';
    protected $fillable = ['nombre', 'descripcion', 'imagen', 'precio', 'categoria_id', 'slug', 'stock', 'stripe_product_id'];
    protected $hidden = ['created_at', 'updated_at'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }


    public function getRouteKeyName()
    {
        return 'slug';
    }
}
