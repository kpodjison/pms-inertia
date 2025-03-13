<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    /** @use HasFactory<\Database\Factories\NoticeFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
        'property_id',
    ];

    public function property(){
        return $this->belongsTo(Property::class);
    }

}
