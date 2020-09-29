<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\BunkController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});

Route::get('/', function () {
	return "Hello, world!";
});

Route::apiResource('rooms', RoomController::class);
Route::apiResource('rooms.bunks', BunkController::class)->shallow();

Route::apiResource('users', UserController::class)
	->except([
		'index', 'destroy'
	]);

Route::apiResource('bookings', BookingController::class)
	->except([
		'update'
	]);
