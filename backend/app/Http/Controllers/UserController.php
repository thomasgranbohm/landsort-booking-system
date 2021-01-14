<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		// curl localhost:8080/api/users
		return User::all();
	}
	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */

	// curl localhost:8080/api/users -X POST -d "email=thomas@granbohm.dev&firstname=Thomas&lastname=Granbohm&phonenumber=0736761614"
	public function store(Request $request)
	{
		//
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
			return $validator
				->errors()
				->toJson();
		}

		return User::create($validator->validated())
			->save();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function show(User $user)
	{
		//
		return User::where('id', $user->id)->with('bookings')->first();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, User $user)
	{
		//
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
			return $validator
				->errors()
				->toJson();
		}

		return $user->update($validator->validated());
	}
}
