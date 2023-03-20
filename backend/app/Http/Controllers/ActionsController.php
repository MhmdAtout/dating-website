<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Follower;
use App\Models\Block;

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
                            ->where("recepient_id", $request->recepient_id)
                            ->orWhere("sender_id", $request->recepient_id)
                            ->where("recepient_id", $request->sender_id)
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

    function getFollowing(Request $request){
        $following = Follower::where("follower_id", $request->follower_id)
                                ->with("followed")
                                ->get();

        if($following->count()!=0){
            return response()->json([
                "response" => $following
            ]);
        }else{
            return response()->json([
                "response" => "No Following"
            ]);
        }
    }

    function block(Request $request){
        $block = Block::where("blocker_id", $request->blocker_id)
                            ->where("blocked_id", $request->blocked_id)
                            ->get();
        if($block->count()!=0){
            $block = Block::where("blocker_id", $request->blocker_id)
                            ->where("blocked_id", $request->blocked_id)
                            ->delete();

            return response()->json([
                "status" => "unblocked"
            ]);
        }else{
            $block = Block::create([
                "blocker_id" => $request->blocker_id,
                "blocked_id" => $request->blocked_id,
            ]);

            $remove_follow = Follower::where("follower_id", $request->blocker_id)
                                    ->where("followed_id", $request->blocked_id)
                                    ->delete();
    
            return response()->json([
                "message" => $block,
                "status" => "blocked"
            ]);
        }
    }

    function getBlocks(Request $request){
        $blocks = Block::where("blocker_id", $request->blocker_id)
                        ->with("blocked")
                        ->get();

        if($blocks->count()!=0){
            return response()->json([
                "response" => $blocks
            ]);
        }else{
            return response()->json([
                "response" => "No Blocks"
            ]);
        }
    }
}
