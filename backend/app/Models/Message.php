<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        "sender_id",
        "recepient_id",
        "content"
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function recepient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recepient_id');
    }
}
