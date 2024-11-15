<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categoria';
    protected $fillable = ['nombre', 'descripcion', 'imagen', 'slug'];
    protected $hidden = ['created_at', 'updated_at'];

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}
