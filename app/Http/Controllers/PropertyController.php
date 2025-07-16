<?php
namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            'yearOfCons'  => 'required|integer|min:2015|max:' . date('Y'),
            'images.*'    => 'required|file|image',
        ], [
            'title.required'       => 'Please provide a property title.',
            'title.string'         => 'The title must be a valid text.',
            'title.max'            => 'The title can be up to 255 characters.',

            'description.required' => 'Please include a property description.',
            'description.string'   => 'The description must be valid text.',
            'description.max'      => 'The description can be up to 255 characters.',

            'price.required'       => 'Please enter a price for the property.',
            'price.numeric'        => 'The price must be a valid number.',
            'price.min'            => 'The price must be zero or higher.',

            'type.required'        => 'Select the property type (e.g., apartment, house).',
            'type.string'          => 'The property type must be text.',
            'type.max'             => 'The property type can be up to 50 characters.',

            'street.required'      => 'Please provide the street address.',
            'street.string'        => 'The street must be valid text.',
            'street.max'           => 'The street address can be up to 255 characters.',

            'region.required'      => 'Please select a region.',
            'region.string'        => 'The region must be valid text.',
            'region.max'           => 'The region can be up to 100 characters.',

            'city.required'        => 'Please enter the city.',
            'city.string'          => 'The city must be valid text.',
            'city.max'             => 'The city name can be up to 100 characters.',

            'category.required'    => 'Please select a property category (e.g., rent, sale).',
            'category.string'      => 'The category must be valid text.',
            'category.max'         => 'The category can be up to 100 characters.',

            'size.required'        => 'Please provide the size of the property in square units.',
            'size.numeric'         => 'The size must be a valid number.',
            'size.min'             => 'The size must be at least 0.',

            'bedroom.required'     => 'Enter the number of bedrooms.',
            'bedroom.integer'      => 'The bedroom count must be a whole number.',
            'bedroom.min'          => 'Bedrooms cannot be less than 0.',

            'bathroom.required'    => 'Enter the number of bathrooms.',
            'bathroom.integer'     => 'The bathroom count must be a whole number.',
            'bathroom.min'         => 'Bathrooms cannot be less than 0.',

            'furnishing.required'  => 'Specify the furnishing status (e.g., semi, full).',
            'furnishing.string'    => 'The furnishing must be valid text.',
            'furnishing.max'       => 'The furnishing status can be up to 100 characters.',

            'yearOfCons.required'  => 'Enter the year the property was constructed.',
            'yearOfCons.integer'   => 'The construction year must be a valid year.',
            'yearOfCons.min'       => 'The construction year must be 2000 or later.',
            'yearOfCons.max'       => 'The construction year cannot be in the future.',

            'images.*.required'    => 'Each property image is required.',
            'images.*.file'        => 'Each uploaded file must be a valid file.',
            'images.*.image'       => 'Only image files are allowed for property photos.',
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

    public function getPropertyLocations()
    {
        $uniqueLocations = Property::distinct()->pluck('city');
        return response()->json(['data' => $uniqueLocations]);
    }

    public function notifications()
    {
        $properties = Property::with(['images', 'notices'])->orderBy('id', 'desc')->get();
        return response()->json(['data' => $properties]);
    }

    public function indexProperty()
    {
        $category = request('category');
        $location = request('location');
        DB::enableQueryLog();
        if ($category && $location) {
            $properties = Property::with('images')->where('is_visible', '=', '1')
                ->where('category', $category)
                ->where('city', $location)
                ->orderBy('id', 'desc')->get();
                Log::info($properties);
                dd(DB::getQueryLog());
        } else {
            $properties = Property::with('images')->where('is_visible', '=', '1')->orderBy('id', 'desc')->get();
        }

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
