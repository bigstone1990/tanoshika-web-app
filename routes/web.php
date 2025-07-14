<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('user.')->middleware(['auth:user', 'verified'])->group(function () {
    Route::get('', function () {
        return Inertia::render('user/dashboard');
    })->name('home');
    Route::get('dashboard', function () {
        return Inertia::render('user/dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
