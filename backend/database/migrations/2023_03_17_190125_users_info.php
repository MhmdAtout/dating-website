<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_info', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('id')->on('users');
            $table->string('profile_pic')->nullable();
            $table->string('optional_pic1')->nullable();
            $table->string('optional_pic2')->nullable();
            $table->string('optional_pic3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
