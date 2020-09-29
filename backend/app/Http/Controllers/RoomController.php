<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/* 
 *	Verb 		URI 			Action 		Route Name
 *	-----		-----			-----		-----
 *	GET 		/rooms 			index 		rooms.index
 *	POST 		/rooms 			store 		rooms.store
 *	GET 		/rooms/{room} 	show 		rooms.show
 *	PUT/PATCH 	/rooms/{room} 	update 		rooms.update
 *	DELETE 		/rooms/{room} 	destroy 	rooms.destroy
*/


class RoomController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		// curl http://api.example.dev/rooms
		return Room::all();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// curl api.example.test/rooms -X POST -d "location=A"
		$validator = Validator::make($request->toArray(), [
			'location' => 'required|unique:rooms|min:1|max:16'
		]);
		if ($validator->fails()) return $validator->errors()->toJson();

		return Room::create($validator->validated())
			->save();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Room  $room
	 * @return \Illuminate\Http\Response
	 */
	public function show(Room $room)
	{
		// curl api.example.dev/rooms/1
		return $room;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Room  $room
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Room $room)
	{
		// curl api.example.dev/rooms/1 -X PUT -d "location=D"
		$validator = Validator::make($request->toArray(), [
			'location' => 'required|unique:rooms|max:16'
		]);
		if ($validator->fails()) return $validator->errors()->toJson();

		$room->location = $validator->validated()['location'];

		return $room->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Room  $room
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Room $room)
	{
		// curl api.example.dev/rooms/1 -X DELETE
		return $room->delete();
	}
}
