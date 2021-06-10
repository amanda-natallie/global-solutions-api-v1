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
    /* Route::prefix('/users')->group(function(){
        Route::post('/','UsuarioController@login')->name('login');
        Route::post('/create','UserController@create')->name('create');
        Route::post('/token','UsuarioController@gerarToken')->name('gerarToken');
    }); */
    Route::prefix('/car-washers')->group(function(){
        Route::get('/getAll','CarWashController@getAll')->name('getAll');
    });
    /* Route::prefix('/conteudo')->group(function(){
        Route::post('/find','ConteudoController@find')->name('find');
        Route::post('/create','ConteudoController@create')->name('create');
        Route::post('/update','ConteudoController@update')->name('update');
        Route::post('/remove','ConteudoController@remove')->name('remove');
    });
    Route::prefix('/image')->group(function(){
        Route::post('/find','ImageController@find')->name('find');
        Route::post('/create','ImageController@create')->name('create');
        Route::post('/update','ImageController@update')->name('update');
        Route::post('/upload','ImageController@upload')->name('upload');
        Route::post('/remove','ImageController@remove')->name('remove');
    }); */
});