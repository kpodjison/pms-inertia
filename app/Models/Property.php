<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\PropertyItem;

class Property extends Model
{
   
    use HasFactory;
      protected $fillable = [
        'title',
        'description',
        'price',
        'code',
        'type',
        'street',
        'city',
        'region',
        'category',
        'size',
        'bedroom',
        'bathroom',
        'furnishing',
        'yearOfCons',
        'is_visible'
    ];

    public function images(){
      return $this->hasMany(PropertyImage::class);
    }
    public function notices(){
      return $this->hasMany(Notice::class);
    }
}
