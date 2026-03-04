<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class PacienteController extends Controller
  {
     use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return auth()->user()->pacientes()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'apellido' => 'required|string|max:255',
        'email' => 'nullable|email|max:255',
        'telefono' => 'nullable|string|max:50',
        'estado' => 'nullable|string|max:50',
        'notas' => 'nullable|string',
    ]);

    $paciente = auth()->user()->pacientes()->create($validated);

    return response()->json($paciente, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Paciente $paciente)
    {
        $this->authorize('view', $paciente);
        return $paciente;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paciente $paciente)
    {
        $this->authorize('update', $paciente);

        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'apellido' => 'sometimes|required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefono' => 'nullable|string|max:50',
            'estado' => 'nullable|string|max:50',
            'notas' => 'nullable|string',
        ]);

        $paciente->update($validated);

        return response()->json($paciente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paciente $paciente)
    {
        $this->authorize('delete', $paciente);
        $paciente->delete();

        return response()->json(['message' => 'Paciente eliminado']);
    }

}
