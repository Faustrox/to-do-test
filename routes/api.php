<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;

Route::controller(AuthController::class)->group(function(){
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'Show']);
    Route::put('/user/change-password', [UserController::class, 'changePassword']);
    Route::delete('/user', [UserController::class, 'deleteAccount']);
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todo', [TodoController::class, 'store']);
    Route::put('/todo/{todo}', [TodoController::class, 'update']);
    Route::delete('/todo/{todo}', [TodoController::class, 'destroy']);
    Route::delete('/todos', [TodoController::class, 'deleteAllTodos']);
});
