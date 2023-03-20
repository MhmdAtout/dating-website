<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Block;
use App\Models\Follower;
use App\Models\Info;

class UserController extends Controller
{
    function getUsers($id){
        $user = User::find($id);
        $users = User::where("gender", "!=", "$user[gender]")
                        ->get();

        return response()->json([
            "users" => $users
        ]);
    }

    function getUser($id){
        $user = User::with("sent", "received")
        ->find($id);   

        return response()->json([
            "user" => $user
        ]);
    }

    function notification($id){
        $follow = Follower::where("followed_id", $id)
                            ->with("follower")
                            ->get();
        $block = Block::where("blocked_id", $id)
                            ->with("blocker")
                            ->get();
        
        return response()->json([
            "follows" => $follow,
            "blocks" => $block
        ]);
    }

    function update(Request $request){
        $user = User::find($request->id);

        $user->update([
            'bio' => $request->bio ?? $user->bio,
            'location' => $request->location ?? $user->location,
        ]);

        return response()->json([
            "users" => $user
        ]);

    }
}
