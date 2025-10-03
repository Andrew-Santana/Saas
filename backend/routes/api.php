<?php

use App\Http\Controllers\Api\PlanController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/ping', function () {
    return response()->json([
        'message' => 'API Laravel operacional',
        'timestamp' => now()->toIso8601String(),
        'version' => '1.0.0',
    ]);
});

Route::get('/plans', [PlanController::class, 'index']);

// Protected routes
Route::middleware(['auth:sanctum', 'api.rate.limit:100,1'])->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => new UserResource($request->user()),
            'message' => 'Usuário recuperado com sucesso',
        ]);
    });

    // Plan routes (admin only - can be protected later)
    Route::apiResource('plans', PlanController::class)->except(['index']);

    // Subscription routes
    Route::apiResource('subscriptions', SubscriptionController::class);
    Route::post('/subscriptions/{subscription}/cancel', [SubscriptionController::class, 'cancel']);
});
