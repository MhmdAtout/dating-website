<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{

    protected $fillable = [
        "follower_id",
        "followed_id"
    ];

    public function followed(): BelongsTo
    {
        return $this->belongsTo(User::class, "followed_id");
    }
    public function follower(): BelongsTo
    {
        return $this->belongsTo(User::class, "follower_id");
    }
}
