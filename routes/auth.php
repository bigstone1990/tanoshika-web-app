<?php

use App\Http\Controllers\User\Auth\AuthenticatedSessionController;
use App\Http\Controllers\User\Auth\ConfirmablePasswordController;
use App\Http\Controllers\User\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\User\Auth\EmailVerificationPromptController;
use App\Http\Controllers\User\Auth\NewPasswordController;
use App\Http\Controllers\User\Auth\PasswordResetLinkController;
use App\Http\Controllers\User\Auth\RegisteredUserController;
use App\Http\Controllers\User\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:user')->group(function () {
    // Route::post('register', [RegisteredUserController::class, 'store']);

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::name('user.')->group(function () {
        // Route::get('register', [RegisteredUserController::class, 'create'])
        //     ->name('register');

        Route::get('login', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
            ->name('password.request');

        Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
            ->name('password.email');

        Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
            ->name('password.reset');

        Route::post('reset-password', [NewPasswordController::class, 'store'])
            ->name('password.store');
    });
});

Route::name('user.')->middleware('auth:user')->group(function () {
    // Route::get('verify-email', EmailVerificationPromptController::class)
    //     ->name('verification.notice');

    // Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
    //     ->middleware(['signed', 'throttle:6,1'])
    //     ->name('verification.verify');

    // Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    //     ->middleware('throttle:6,1')
    //     ->name('verification.send');

    // Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
    //     ->name('password.confirm');

    // Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
