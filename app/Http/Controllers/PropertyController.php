<?php
namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'type'        => 'required|string|max:50',
            'street'      => 'required|string|max:255',
            'region'      => 'required|string|max:100',
            'city'        => 'required|string|max:100',
            'category'    => 'required|string|max:100',
            'size'        => 'required|numeric|min:0',
            'bedroom'     => 'required|integer|min:0',
            'bathroom'    => 'required|integer|min:0',
            'furnishing'  => 'required|string|max:100',
            'yearOfCons'  => 'required|integer|min:2000|max:' . date('Y'),
            'images.*'    => 'required|file|image',
        ]);

        try {
            $property_code = 'PMS' . strval(time());

            $validated = array_merge($validated, ['code' => $property_code]);
            unset($validated['images']);

            $property = Property::create($validated);

            $imgBag = [];
            if ($request->has('images') && ! empty($request['images'])) {

                foreach ($request['images'] as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $imgName   = 'pms_' . Str::random(10) . '.' . $extension;
                    Storage::disk('public')->putFileAs('propertyimage', $image, $imgName);
                    array_push($imgBag, $imgName);
                }

                for ($i = 0; $i < count($imgBag); $i++) {
                    PropertyImage::create(['url' => $imgBag[$i], 'property_id' => $property->id]);
                }
            }

            return back()->with('status', [
                'message' => 'Property Added Successfully',
                'type'    => 'success',
            ]);
        } catch (\Exception $e) {
            Log::info($e);
            return back()->with('status', [
                'message' => 'Failed to Add Property',
                'type'    => 'error',
            ]);

        }
    }

    public function index()
    {
        if (Auth::user()) {
            $properties = Property::with('images')->orderBy('id', 'desc')->get();
        } else {
            $properties = Property::with('images')->where('is_visible', '=', '1')->orderBy('id', 'desc')->get();

        }
        return response()->json(['data' => $properties]);
    }

    public function notifications()
    {
        $properties = Property::with(['images', 'notices'])->orderBy('id', 'desc')->get();
        return response()->json(['data' => $properties]);
    }

    public function indexProperty()
    {
        $properties = Property::with('images')->where('is_visible', '=', '1')->orderBy('id', 'desc')->get();
        return Inertia::render('Property', [
            'properties' => $properties,
        ]);

    }

    public function show($id)
    {
        $property = Property::where('id', $id)->with('images')->first();
        if (! $property) {
            return back()->with('status', [
                'message' => 'Property not found!',
                'type'    => 'error',
            ]);
        }
        return response()->json($property);
    }

    public function indexShow($id)
    {
        if (Auth::user()) {

            $property = Property::where('id', '=', $id)->with('images')->first();
        } else {
            $property = Property::where('id', '=', $id)->where('is_visible', '=', 1)->with('images')->first();
        }
        if (! $property) {
            return redirect('/');
        }

        return Inertia::render('SingleProperty', [
            'property' => $property,
        ]);
    }
    public function update(Request $request)
    {

        $validated = $request->validate([
            'id'          => 'required|exists:properties,id',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'type'        => 'required|string|max:50',
            'street'      => 'required|string|max:255',
            'region'      => 'required|string|max:100',
            'city'        => 'required|string|max:100',
            'category'    => 'required|string|max:100',
            'size'        => 'required|numeric|min:0',
            'bedroom'     => 'required|integer|min:0',
            'bathroom'    => 'required|integer|min:0',
            'furnishing'  => 'required|string|max:100',
            'yearOfCons'  => 'required|integer|min:2000|max:' . date('Y'),
            'newImages.*' => 'file|image',
        ]);

        try {

            $property = Property::find($request->id);
            $property->update($request->except(['newImages', 'code']));

            $imgBag = [];
            if ($request->has('newImages') && ! empty($request['newImages'])) {

                foreach ($request['newImages'] as $image) {
                    $extension = $image->getClientOriginalExtension();
                    $imgName   = 'pms_' . Str::random(10) . '.' . $extension;
                    Storage::disk('public')->putFileAs('propertyimage', $image, $imgName);
                    array_push($imgBag, $imgName);
                }

                for ($i = 0; $i < count($imgBag); $i++) {
                    PropertyImage::create(['url' => $imgBag[$i], 'property_id' => $property->id]);
                }
            }

            return back()->with('status', [
                'message' => 'Property Updated Successfully',
                'type'    => 'success',
            ]);
        } catch (\Exception $e) {
            Log::info($e);
            return back()->with('status', [
                'message' => 'Failed to Update Property',
                'type'    => 'error',
            ]);

        }

    }
    public function publish($id)
    {

        try {
            $property = Property::find($id);
            $status   = $property->is_visible == 1 ? 0 : 1;
            $property->update(['is_visible' => $status]);

            return back()->with('status', [
                'message' => 'Property Published Successfully',
                'type'    => 'success',
            ]);
        } catch (\Exception $e) {
            return back()->with('status', [
                'message' => 'Failed to Publish Property',
                'type'    => 'error',
            ]);

        }

    }

    public function enquire(Request $request)
    {
        $validated = $request->validate([
            'id'      => 'required|exists:properties,id',
            'email'   => 'required|email',
            'phone'   => 'required|string|min:10|max:14',
            'message' => 'required|string|min:10|max:400',
        ]);

        try {
            Notice::create([
                'name'        => $request->name,
                'email'       => $request->email,
                'phone'       => $request->phone,
                'message'     => $request->message,
                'property_id' => $request->id,
            ]);
            return response()->json(['message' => "Your details have been received successfully. Our team will get in touch soon."]);

        } catch (\Exception $e) {

            // return response()->json(['message' => $e]);
            return response()->json(['message' => "Failed to submit details!"], 500);

        }

    }

}
