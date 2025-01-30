<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
     Admin::create(['name'=>'Emmanuel Kpodji','email'=>'mel@gmail.com','password'=>Hash::make('mel@gmail.com')]);

    }
}
