<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paciente extends Model
{
      use HasFactory;

  protected $fillable = [
    'nombre',
    'apellido',
    'email',
    'telefono',
    'estado',
    'notas',
];

  public function users()
{
     return $this->belongsTo(User::class);
}

    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}
