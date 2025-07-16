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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('code');
            $table->string('description');
            $table->enum('type', ['house', 'apartment']);
            $table->decimal('price', 10, 2);
            $table->string('category');
            $table->string('size');
            $table->string('bedroom');
            $table->string('bathroom');
            $table->enum('furnishing', ['full', 'semi']);
            $table->string('yearOfCons');
            $table->string('street');
            $table->string('region');
            $table->string('city');
            $table->boolean('is_visible')->default(false);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
