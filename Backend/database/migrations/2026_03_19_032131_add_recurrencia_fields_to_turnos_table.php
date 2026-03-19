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
        Schema::table('turnos', function (Blueprint $table) {
            $table->boolean('recurrencia_activa')->default(true);
        $table->date('fecha_fin_repeticion')->nullable();
        $table->boolean('es_excepcion')->default(false);
        $table->unsignedBigInteger('turno_padre_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('turnos', function (Blueprint $table) {
           $table->dropColumn([
            'recurrencia_activa',
            'fecha_fin_repeticion',
            'es_excepcion',
            'turno_padre_id',
        ]);
        });
    }
};
