<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // request()->routeIs()の判定は不可のため
        if (request()->is('admin*')) {
            config(['session.table' => config('session.table_admin')]);
            config(['session.cookie' => config('session.cookie_admin')]);
        } else {
            config(['session.table' => config('session.table')]);
            config(['session.cookie' => config('session.cookie')]);
        }
    }
}
