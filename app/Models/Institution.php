<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Institution extends Model
{
    use HasFactory;
    protected $fillable = ['name','email','address','website','phone_number','established_date'];

    public function Students(){
        return $this->hasMany(Institution::class);
    }


}
