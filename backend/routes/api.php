<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActionsController;


Route::group(["prefix"=>"auth"],function(){
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
    });
});

Route::group(["prefix"=>"user"],function(){
    Route::controller(UserController::class)->group(function () {
        Route::get("/allUsers", "getUsers");
        Route::get("/{id}","getUser");
    });
});

Route::group(["prefix"=>"actions"],function(){
    Route::controller(ActionsController::class)->group(function () {
        Route::post("/sendMesaage", "sendMessage");
        Route::post("/getMesaage", "getMessage");
        Route::post("/follow", "follow");
        Route::post("/following", "getFollowing");
        Route::post("/block", "block");
        Route::post("/blocks", "getBlocks");
    });
});

?>