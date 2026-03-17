<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Turno extends Model
{
   use HasFactory;

  protected $fillable = [
    'user_id',
    'paciente_id',
    'google_event_id',
    'fecha_inicio',
    'fecha_fin',
    'modalidad',
    'estado',
    'meeting_url',
    'es_recurrente',
    'recurrencia_rrule',
];

   protected $casts = [
    'fecha_inicio' => 'datetime',
    'fecha_fin' => 'datetime',
    'es_recurrente' => 'boolean',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
    public function getStartAttribute()
{
    return $this->fecha_inicio?->toIso8601String();
}

public function getEndAttribute()
{
    return $this->fecha_fin?->toIso8601String();
}
}
