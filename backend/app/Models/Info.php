<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Info extends Model
{
    use HasFactory;
    protected $table = "users_info";

    protected $fillable = [
        "bio",
        "prodile_pic",
        "optional_pic1",
        "optional_pic2",
        "optional_pic3",
    ];
}
