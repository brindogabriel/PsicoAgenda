<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class FeriadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $year = request('year', now()->year);

        $feriados = Cache::remember("feriados_$year", 86400, function () use ($year) {
            return Http::get("https://api.argentinadatos.com/v1/feriados/$year")->json();
        });

        return response()->json($feriados);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
