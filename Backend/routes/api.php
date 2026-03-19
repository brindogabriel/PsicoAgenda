<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PacienteController;
use App\Http\Controllers\Api\TurnoController;
use App\Http\Controllers\Api\Auth\GoogleController;
use App\Http\Controllers\Api\FeriadoController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Pacientes y Turnos
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('pacientes', PacienteController::class);
    Route::apiResource('turnos', TurnoController::class);
    Route::post('/turnos/{id}/cancelar-ocurrencia', [TurnoController::class, 'cancelarOcurrencia']);
});

// Feriados
Route::get('/feriados', [FeriadoController::class, 'index']);
