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

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('paciente_id')->constrained()->onDelete('cascade');

            $table->string('google_event_id')->nullable();

            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin');

            $table->enum('modalidad', ['online', 'presencial']);

            $table->enum('estado', ['confirmado', 'pendiente', 'cancelado'])
                  ->default('pendiente');

                  $table->string('meeting_url')->nullable();
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
