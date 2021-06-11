<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::namespace('API')->name('api.')->group(function(){
    Route::prefix('/car')->group(function(){
        Route::get('/getAll',[\App\Http\Controllers\Api\CarController::class,"findAll"])->name("findAll");
        Route::post('/getById',[\App\Http\Controllers\Api\CarController::class,"findByid"])->name("findByid");
        Route::post('/create',[\App\Http\Controllers\Api\CarController::class,"create"])->name("create");
        Route::post('/update',[\App\Http\Controllers\Api\CarController::class,"update"])->name("update");
        Route::post('/upload',[\App\Http\Controllers\Api\CarController::class,"upload"])->name("upload");
        Route::post('/remove',[\App\Http\Controllers\Api\CarController::class,"remove"])->name("remove");
    });
    Route::prefix('/carwash')->group(function(){
        Route::get('/getAll',[\App\Http\Controllers\Api\CarwashController::class,"findAll"])->name("findAll");
        Route::post('/getById',[\App\Http\Controllers\Api\CarwashController::class,"findByid"])->name("findByid");
        Route::post('/create',[\App\Http\Controllers\Api\CarwashController::class,"create"])->name("create");
        Route::post('/update',[\App\Http\Controllers\Api\CarwashController::class,"update"])->name("update");
        Route::post('/remove',[\App\Http\Controllers\Api\CarwashController::class,"remove"])->name("remove");
    });
});