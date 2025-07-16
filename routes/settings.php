<?php

use App\Http\Controllers\User\Settings\PasswordController;
use App\Http\Controllers\User\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth:user')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::name('user.')->group(function () {
        Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
        // Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

        Route::get('settings/appearance', function () {
            return Inertia::render('user/settings/appearance');
        })->name('appearance');
    });
});
