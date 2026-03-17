<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;
use App\Helpers\FeriadoHelper;

class UpdateTurnoRequest extends FormRequest
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
        ];
    }
}
