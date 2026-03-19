<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Turno;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Services\TurnoService;
use App\Http\Requests\StoreTurnoRequest;
use App\Http\Requests\UpdateTurnoRequest;

class TurnoController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{

  $start = $request->query('start');
    $end = $request->query('end');

    $start = $start ? \Carbon\Carbon::parse($start) : now()->startOfMonth();
    $end = $end ? \Carbon\Carbon::parse($end) : now()->addMonths(2);

    $turnos = Turno::with('paciente')
        ->where('user_id', auth()->id())
        ->get();

    $eventos = [];

    foreach ($turnos as $turno) {

        // 🟢 turno normal
        if (!$turno->es_recurrente) {
            $eventos[] = $turno;
            continue;
        }

        // 🔵 turno recurrente (solo semanal por ahora)
        $current = \Carbon\Carbon::parse($turno->fecha_inicio);

        while ($current <= $end) {

            if (!$current->between($start, $end)) {
                $current->addWeek();
                continue;
            }

            $eventos[] = [
                'id' => $turno->id . '-' . $current->format('Ymd'),
                'paciente' => $turno->paciente,
                'fecha_inicio' => $current->toDateTimeString(),
                'fecha_fin' => $current->copy()->addMinutes(
                    \Carbon\Carbon::parse($turno->fecha_inicio)
                        ->diffInMinutes($turno->fecha_fin)
                ),
                'modalidad' => $turno->modalidad,
                'estado' => $turno->estado,
            ];

            $current->addWeek();
        }
    }

    return response()->json($eventos);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTurnoRequest $request, TurnoService $turnoService)
    {
        $data = $request->validated();

        $data['user_id'] = auth()->id();

        try {
            $turno = $turnoService->crear($data);

            return response()->json($turno, 201);
        } catch (\Exception $e) {
            return response()->json(
                [
                    'message' => $e->getMessage(),
                ],
                422,
            );
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Turno $turno)
    {
           $this->authorize('view', $turno);

    $turno->load('paciente');

    return response()->json($turno);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateTurnoRequest $request, Turno $turno, TurnoService $turnoService)
{
    $this->authorize('update', $turno);

    $data = $request->validated();

    try {

        $turno = $turnoService->actualizar($turno, $data);

        return response()->json($turno);

    } catch (\Exception $e) {

        return response()->json([
            'message' => $e->getMessage()
        ], 422);

    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Turno $turno)
    {
        $this->authorize('delete', $turno);
        $turno->delete();

       return response()->noContent();
    }

    public function cancelarOcurrencia(Request $request, $id)
{
    $turno = Turno::findOrFail($id);

    $fecha = $request->input('fecha'); // YYYY-MM-DD

    $fechaInicio = \Carbon\Carbon::parse($fecha . ' ' . $turno->fecha_inicio->format('H:i:s'));
    $fechaFin = \Carbon\Carbon::parse($fecha . ' ' . $turno->fecha_fin->format('H:i:s'));

    Turno::create([
        'user_id' => auth()->id(),
        'paciente_id' => $turno->paciente_id,
        'fecha_inicio' => $fechaInicio,
        'fecha_fin' => $fechaFin,
        'modalidad' => $turno->modalidad,
        'estado' => 'cancelado',

        'es_recurrente' => false,
        'es_excepcion' => true,
        'turno_padre_id' => $turno->id,
    ]);

    return response()->json(['message' => 'Ocurrencia cancelada']);
}
}
