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

        $inicio = Carbon::parse($data['fecha_inicio']);
        $fin = Carbon::parse($data['fecha_fin']);

        $diaSemana = $inicio->dayOfWeek;

        $conflicto = Turno::where('user_id', $data['user_id'])
            ->where(function ($query) use ($inicio, $fin, $diaSemana) {
                // 🟢 normales
                $query
                    ->where(function ($q) use ($inicio, $fin) {
                        $q->where('es_recurrente', false)->where('fecha_inicio', '<', $fin)->where('fecha_fin', '>', $inicio);
                    })

                    // 🔵 recurrentes
                    ->orWhere(function ($q) use ($inicio, $fin, $diaSemana) {
                        $q->where('es_recurrente', true)
                            ->where('recurrencia_activa', true)
                            ->where('es_excepcion', false)
                            ->where(function ($sub) use ($inicio) {
                                $sub->whereNull('fecha_fin_repeticion')->orWhere('fecha_fin_repeticion', '>=', $inicio);
                            });

                        $q->whereRaw('DAYOFWEEK(fecha_inicio) = ?', [$diaSemana + 1]);

                        $q->where(function ($overlap) use ($inicio, $fin) {
                            $overlap->whereTime('fecha_inicio', '<', $fin->format('H:i:s'))->whereTime('fecha_fin', '>', $inicio->format('H:i:s'));
                        });
                    });
            })
            ->exists();

        if ($conflicto) {
            throw new \Exception('Ya existe un turno en ese horario');
        }

        // COSAS IMPORTANTES
        $data['es_recurrente'] = $data['repetir'] ?? false;
        $data['recurrencia_activa'] = $data['repetir'] ?? false;
        $data['fecha_fin_repeticion'] = $data['fecha_fin_repeticion'] ?? null;

        unset($data['repetir']);
        return Turno::create($data);
    }

    public function actualizar(Turno $turno, array $data): Turno
    {
        $inicio = Carbon::parse($data['fecha_inicio']);
        $fin = Carbon::parse($data['fecha_fin']);

        $diaSemana = $inicio->dayOfWeek;

        $conflicto = Turno::where('user_id', $turno->user_id)
            ->where('id', '!=', $turno->id) // 👈 esto evita conflicto consigo mismo
            ->where(function ($query) use ($inicio, $fin, $diaSemana) {
                // 🟢 conflictos con turnos normales
                $query
                    ->where(function ($q) use ($inicio, $fin) {
                        $q->where('es_recurrente', false)->where('fecha_inicio', '<', $fin)->where('fecha_fin', '>', $inicio);
                    })

                    // 🔵 conflictos con recurrentes
                    ->orWhere(function ($q) use ($inicio, $fin, $diaSemana) {
                        $q->where('es_recurrente', true)
                            ->where('recurrencia_activa', true)
                            ->where(function ($sub) use ($inicio) {
                                $sub->whereNull('fecha_fin_repeticion')->orWhere('fecha_fin_repeticion', '>=', $inicio);
                            });

                        $q->whereRaw('DAYOFWEEK(fecha_inicio) = ?', [$diaSemana + 1]);

                        $q->where(function ($overlap) use ($inicio, $fin) {
                            $overlap->whereTime('fecha_inicio', '<', $fin->format('H:i:s'))->whereTime('fecha_fin', '>', $inicio->format('H:i:s'));
                        });
                    });
            })
            ->exists();

        if ($conflicto) {
            throw new \Exception('Ese horario ya está ocupado');
        }

        $turno->update([
            'fecha_inicio' => $inicio,
            'fecha_fin' => $fin,
        ]);

        return $turno->load('paciente');
    }
}
