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
            $this->configureAdminSession();
        }
    }

    private function configureAdminSession(): void
    {
        if ($adminTable = config('session.admin_table')) {
            config(['session.table' => $adminTable]);
        }
        
        if ($adminCookie = config('session.admin_cookie')) {
            config(['session.cookie' => $adminCookie]);
        }
    }
}
