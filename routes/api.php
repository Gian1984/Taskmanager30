<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/authenticated', function () {
    return true;
});

Route::middleware('auth:sanctum')->get('index', function (Request $request) {
    Route::get('index', [UserController::class], 'index');
    return $users = DB::table('users')->get(['name','roles','quote','author','avatar','email']);
});


Route::get('delete/{id}',[UserController::class,'delete']);
Route::put('update/{id}',[UserController::class,'update']);


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);


Route::resource('tasks', TaskController::class)->except(['create', 'show']);
