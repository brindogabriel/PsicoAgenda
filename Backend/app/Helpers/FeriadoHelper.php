<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class FeriadoHelper
{
    public static function esFeriado($fecha): bool
    {
        $year = Carbon::parse($fecha)->year;

        $feriados = Cache::remember("feriados_$year", 86400, function () use ($year) {
            return Http::get("https://api.argentinadatos.com/v1/feriados/$year")->json();
        });

        return collect($feriados)
            ->pluck('fecha')
            ->contains(Carbon::parse($fecha)->toDateString());
    }
}
