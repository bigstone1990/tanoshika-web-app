<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\Account\Admin\AdminController;
use App\Http\Controllers\Admin\Office\OfficeController;

Route::prefix('admin')->name('admin.')->middleware(['auth:admin', 'verified'])->group(function () {
    Route::redirect('', '/admin/dashboard')->name('home');
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::prefix('account')->name('account.')->group(function () {
        Route::resource('admins', AdminController::class);
        Route::post('admins/bulk-delete', [AdminController::class, 'bulkDestroy'])->name('admins.bulk-destroy');
    });

    Route::resource('offices', OfficeController::class);
    Route::post('offices/bulk-delete', [OfficeController::class, 'bulkDestroy'])->name('offices.bulk-destroy');
});

require __DIR__.'/adminSettings.php';
require __DIR__.'/adminAuth.php';
