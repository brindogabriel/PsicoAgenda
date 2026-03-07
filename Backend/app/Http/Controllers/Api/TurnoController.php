<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Turno;
use Illuminate\Http\Request;

class TurnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $turnos = Turno::with('paciente')
        ->where('user_id', auth()->id())
        ->orderBy('fecha_inicio')
        ->get();

    return response()->json($turnos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $data = $request->validate([
        'paciente_id' => 'required|exists:pacientes,id',
        'fecha_inicio' => 'required|date',
        'fecha_fin' => 'required|date|after:fecha_inicio',
        'modalidad' => 'required|in:online,presencial',
        'meeting_url' => 'nullable|string',
        'es_recurrente' => 'boolean',
        'recurrencia_rrule' => 'nullable|string',
    ]);

    $data['user_id'] = auth()->id();

    $turno = Turno::create($data);

    return response()->json($turno, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Turno $turno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Turno $turno)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Turno $turno)
    {
        //
    }
}
