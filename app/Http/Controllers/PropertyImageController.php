<?php
namespace App\Http\Controllers;

use App\Models\PropertyImage;
use Illuminate\Http\Request;

class PropertyImageController extends Controller
{
    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:property_images,id',
        ]);

        try {
            PropertyImage::where('id',$request->id)->delete();

            return back()->with('status', [
                'message' => 'Property Image Deleted Successfully',
                'type'    => 'success',
            ]);
        } catch (\Exception $e) {
            return back()->with('status', [
                'message' => 'Failed to Delete Property Image',
                'type'    => 'error',
            ]);

        }

    }
}
