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

    $query = Turno::with('paciente')
        ->where('user_id', auth()->id());

    if ($start && $end) {
        $query->whereBetween('fecha_inicio', [$start, $end]);
    }

    $turnos = $query
        ->orderBy('fecha_inicio')
        ->get();

    return response()->json($turnos);
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

}
