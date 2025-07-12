<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->name('admin.')->middleware(['auth:admins', 'verified'])->group(function () {
    Route::get('', function () {
        return Inertia::render('admin/dashboard');
    })->name('top');
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

require __DIR__.'/adminSettings.php';
require __DIR__.'/adminAuth.php';
