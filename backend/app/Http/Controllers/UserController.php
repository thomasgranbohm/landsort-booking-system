<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
	public function index()
	{
		return $this->respond(["users" => User::all()]);
	}

	public function store(Request $request)
	{
		$validator = Validator::make(
			$request->all(),
			[
				"email" => ["required", "unique:users,email", "email", "max:128"],
				"firstname" => ["required", "regex:/^[a-zA-Z]+$/", "max:48"],
				"lastname" => ["required", "regex:/^[a-zA-Z]+$/", "max:128"],
				"phonenumber" => ["regex:/^[0-9]+$/", "min:10", "max:12", "unique:users,phonenumber"]
			]
		);

		if ($validator->fails()) {
			return $this->errors($validator->errors()->toJson());
		}

		return $this->respond([
			"created" => User::create($validator->validated())
				->save()
		]);
	}

	public function show(User $user)
	{
		return $this->respond(["user" => User::where('id', $user->id)->with('bookings', 'bookings.bunks', 'bookings.bunks.room')->first()]);
	}

	public function update(Request $request, User $user)
	{
		$validator = Validator::make(
			$request->all(),
			[
				"email" => ["unique:users,email", "email", "max:128"],
				"firstname" => ["regex:/^[a-zA-Z]+$/", "max:48"],
				"lastname" => ["regex:/^[a-zA-Z]+$/", "max:128"],
				"phonenumber" => ["regex:/^[0-9]+$/", "min:10", "max:12", "unique:users,phonenumber"]
			]
		);

		if ($validator->fails()) {
			return $this->errors($validator->errors()->toJson());
		}

		return $this->respond(["updated" => $user->update($validator->validated())]);
	}
}
