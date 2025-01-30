<?php
namespace App\Http\Controllers;

use App\Models\Property;

class NoticeController extends Controller
{

    public function index()
    {
        $properties = Property::with('images')->orderBy('id', 'desc')->get();
        return response()->json(['data' => $properties]);
    }

}
