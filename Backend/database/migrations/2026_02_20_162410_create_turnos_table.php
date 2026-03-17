<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
   Schema::create('turnos', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('paciente_id')->constrained()->cascadeOnDelete();

    $table->string('google_event_id')->nullable();

    $table->dateTime('fecha_inicio');
    $table->dateTime('fecha_fin');

    $table->enum('modalidad', ['online', 'presencial']);

    $table->enum('estado', [
        'pendiente',
        'confirmado',
        'cancelado'
    ])->default('pendiente');

    $table->string('meeting_url')->nullable();

    // recurrencia
    $table->boolean('es_recurrente')->default(false);
    $table->string('recurrencia_rrule')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
