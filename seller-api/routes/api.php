<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('sellers', 'API\SellerController@index');
Route::get('sellers/{seller}', 'API\SellerController@show');
Route::post('sellers', 'API\SellerController@store');
Route::put('sellers/{seller}', 'API\SellerController@update');
Route::delete('sellers/{seller}', 'API\SellerController@destroy');

Route::get('sales/{seller}', 'API\SaleController@index');
Route::post('sales/', 'API\SaleController@store');
Route::delete('sales/{sale}', 'API\SaleController@destroy');
