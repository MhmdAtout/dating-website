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


}
