<?php

namespace App\Services;

use App\Models\Turno;
use Carbon\Carbon;

class TurnoService
{
    public function crear(array $data): Turno
    {
        if (Carbon::parse($data['fecha_inicio'])->isPast()) {
            throw new \Exception('No se pueden crear turnos en el pasado');
        }

        $conflicto = Turno::where('user_id', $data['user_id'])
            ->where(function ($query) use ($data) {
                $query->where('fecha_inicio', '<', $data['fecha_fin'])->where('fecha_fin', '>', $data['fecha_inicio']);
            })
            ->exists();

        if ($conflicto) {
            throw new \Exception('Ya existe un turno en ese horario');
        }

        return Turno::create($data);
    }
    public function actualizar(Turno $turno, array $data): Turno
    {

   $fechaInicio = Carbon::parse($data['fecha_inicio'])->format('Y-m-d H:i:s');
$fechaFin = Carbon::parse($data['fecha_fin'])->format('Y-m-d H:i:s');

    $conflicto = Turno::where('user_id', $turno->user_id)
        ->where('id', '!=', $turno->id)
        ->where(function ($query) use ($fechaInicio, $fechaFin) {
            $query->where('fecha_inicio', '<', $fechaFin)
                  ->where('fecha_fin', '>', $fechaInicio);
        })
        ->exists();

    if ($conflicto) {
        throw new \Exception('Ese horario ya está ocupado');
    }

    $turno->update([
        'fecha_inicio' => $fechaInicio,
        'fecha_fin' => $fechaFin,
    ]);

    return $turno->load('paciente');
    }
}
