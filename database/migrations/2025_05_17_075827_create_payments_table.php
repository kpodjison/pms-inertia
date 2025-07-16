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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'completed', 'failed']);
            $table->enum('payment_method', ['bank', 'momo']);
            $table->string('reference');
            $table->string('transaction_id');
            $table->string('phone_number')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->date('payment_date');
            $table->timestamps();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('property_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
