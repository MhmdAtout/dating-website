<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActionsController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');

});

Route::group(["prefix"=>"user"],function(){
    Route::get("/allUsers",[UserController::class,"getUsers"]);
    Route::get("/{id}",[UserController::class,"getUser"]);
});

Route::group(["prefix"=>"actions"],function(){
    Route::post("/sendMesaage",[ActionsController::class,"sendMessage"]);
});


?>