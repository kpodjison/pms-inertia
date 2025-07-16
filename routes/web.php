<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyImageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/************************************ Admin routes *********************************/
Route::middleware('auth')->group(function () {

 Route::prefix('admin/dashboard')->group(function (){

        Route::get('/',function (){
            return Inertia::render('Admin/Admin');
        });
        Route::get('properties',function (){
            return Inertia::render('Admin/Properties');
        });
        Route::get('notification',function (){
            return Inertia::render('Admin/Notification');
        });


        Route::get('/property',[PropertyController::class,'index']);
        Route::get('/property/{id}',[PropertyController::class,'show']);
        Route::post('/property',[PropertyController::class,'store']);
        Route::post('/property/update/',[PropertyController::class,'update']);
        Route::post('/property/publish/{id}',[PropertyController::class,'publish']);
        // Route::get('/property-notifications', [PropertyController::class, 'notifications']);



        // Route::get('/notification',[NoticeController::class,'index']);
        Route::post('/property-image/delete',[PropertyImageController::class,'delete']);

        Route::get('/notifications', [NoticeController::class, 'index']);






        Route::post('/items',[ItemController::class,'store']);
        Route::get('/items',[ItemController::class,'index']);
        Route::patch('/items',[ItemController::class,'update']);
        Route::get('/items/{id}',[ItemController::class,'show']);


        Route::get('/institution',[InstitutionController::class,'index']);
        Route::post('/institution',[InstitutionController::class,'store']);

    });
});






Route::get('/', function () {
    return Inertia::render('Home');
});
// Route::get('/property', function () {
//     return Inertia::render('Property');
// });



Route::get('/property', [PropertyController::class, 'indexProperty']);
Route::post('/property-enquire', [PropertyController::class, 'enquire']);
Route::get('/property-all', [PropertyController::class, 'index']);
Route::get('/property/{id}', [PropertyController::class, 'indexShow']);
Route::get('/get-property-locations', [PropertyController::class, 'getPropertyLocations']);





Route::get('/logina/dmin', function () {
    return Inertia::render('AdminLogin');
});

require __DIR__.'/auth.php';
