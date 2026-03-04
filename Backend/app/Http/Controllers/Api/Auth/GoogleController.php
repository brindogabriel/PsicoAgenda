<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();

        // Aquí puedes manejar la lógica de autenticación o registro del usuario
        // Por ejemplo, puedes buscar o crear un usuario en tu base de datos
        // y luego generar un token de autenticación para el usuario

        // Ejemplo de respuesta con el token de autenticación
        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // Alternativamente, si deseas redirigir al usuario a una página después de la autenticación

    public function callback()
    {
        $googleUser = Socialite::driver('google')
            ->stateless()
            ->user();

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password' => bcrypt(str()->random(24)),
            ]
        );

        Auth::login($user);

        return redirect('http://localhost:3000/dashboard');
}
}
