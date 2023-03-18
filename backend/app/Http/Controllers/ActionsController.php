<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Follower;

class ActionsController extends Controller
{
    function sendMessage(Request $request){
        $message = Message::create([
            "sender_id" => $request->sender_id,
            "recepient_id" => $request->recepient_id,
            "content" => $request->content,
        ]);

        return response()->json([
            "message" => $message->content,
            "status" => "sent"
        ]);
    }

    function getMessage(Request $request){
        $message = Message::where("sender_id", $request->sender_id)
                            ->orWhere("recepient_id", $request->recepient_id)
                            ->orWhere("sender_id", $request->recepient_id)
                            ->orWhere("recepient_id", $request->sender_id)
                            ->with("sender", "recepient")
                            ->get();

        return response()->json([
            "response" => $message
        ]);
    }

    function follow(Request $request){
        $follow = Follower::where("follower_id", $request->follower_id)
                            ->where("followed_id", $request->followed_id)
                            ->get();
        if($follow->count()!=0){
            $follow = Follower::where("follower_id", $request->follower_id)
                            ->where("followed_id", $request->followed_id)
                            ->delete();

            return response()->json([
                "status" => "unfollowed"
            ]);
        }else{
            $follow = Follower::create([
                "follower_id" => $request->follower_id,
                "followed_id" => $request->followed_id,
            ]);
    
            return response()->json([
                "message" => $follow,
                "status" => "followed"
            ]);
        }
    }
}
