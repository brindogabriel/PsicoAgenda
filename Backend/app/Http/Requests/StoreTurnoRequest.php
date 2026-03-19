<?php

namespace App\Http\Requests;
use App\Helpers\FeriadoHelper;
use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class StoreTurnoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'paciente_id' => 'required|exists:pacientes,id',
            'fecha_inicio' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $fecha = Carbon::parse($value);

                    if ($fecha->lt(now())) {
                        $fail('No podés usar fechas pasadas.');
                    }

                    if (FeriadoHelper::esFeriado($fecha)) {
                        $fail('No se pueden asignar turnos en feriados.');
                    }
                },
            ],
            'fecha_fin' => ['required', 'date', 'after:fecha_inicio'],
            'modalidad' => 'required|in:online,presencial',
            'meeting_url' => 'nullable|string',
            'es_recurrente' => 'boolean',
            'recurrencia_rrule' => 'nullable|string',
            'repetir' => 'boolean',
'fecha_fin_repeticion' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'paciente_id.required' => 'Debes seleccionar un paciente',
            'fecha_inicio.required' => 'La fecha de inicio es obligatoria',
            'fecha_fin.after' => 'La fecha de fin debe ser posterior al inicio',
        ];
    }
}
