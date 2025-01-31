<?php
namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\Property;

class NoticeController extends Controller
{

    public function index()
    {
        $notifications = Notice::with(['property'])->orderBy('id', 'desc')->get();
        return response()->json(['data' => $notifications]);
    }

}
