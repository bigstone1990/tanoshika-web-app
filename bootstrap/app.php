<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->group(__DIR__.'/../routes/admin.php');
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->redirectGuestsTo(function (Request $request) {
            if (request()->routeIs('admin.*')) {
                return $request->expectsJson() ? null : route('admin.login');
            }
            else {
                return $request->expectsJson() ? null : route('user.login');
            }
        });
        $middleware->redirectUsersTo(function () {
            if (Auth::guard('users')->check()) {
                return route('user.dashboard');
            }
            elseif (Auth::guard('admins')->check()) {
                return route('admin.dashboard');
            }
        
            return null;
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 419) {
                return Inertia::render('Redirect', [
                    'redirectTo' => url()->previous(),
                ]);
            }
    
            return $response;
        });
    })->create();
