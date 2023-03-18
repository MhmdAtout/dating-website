<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    function getUsers(){
        $users = User::all();

        return response()->json([
            "users" => $users
        ]);
    }

    function getUser($id){
        $user = User::find($id);

        return response()->json([
            "user" => $user
        ]);
    }
}
