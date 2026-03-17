<?php

namespace App\Providers;

use App\Models\Paciente;
use App\Models\Turno;
use App\Models\User;
use App\Policies\PacientePolicy;
use App\Policies\TurnoPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Paciente::class => PacientePolicy::class,
        Turno::class => TurnoPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }

    /**
     * Register the application's policies.
     */
    protected function registerPolicies(): void
    {
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }
}
