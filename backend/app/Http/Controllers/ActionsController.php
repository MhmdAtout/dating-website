<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

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
}
