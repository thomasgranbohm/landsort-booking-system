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

Route::get("/rooms/available", [RoomController::class, "available"]);
Route::apiResource('rooms', RoomController::class);

Route::get("/bunks/available", [BunkController::class, "available"]);
Route::apiResource('rooms.bunks', BunkController::class)->shallow();

Route::get("/users/email", [UserController::class, "email"]);
Route::apiResource('users', UserController::class)
	->except([
		'destroy'
	]);

Route::get('/bookings/confirm/{confirmation_token}', [BookingController::class, "confirm"]);
Route::get('/bookings/cancel/{cancellation_token}', [BookingController::class, "cancel"]);
Route::apiResource('bookings', BookingController::class)
	->except([
		'update',
		'destroy'
	]);
