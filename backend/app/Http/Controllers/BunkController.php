<?php

namespace App\Http\Controllers;

use App\Models\Bunk;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/* 
 * Verb 		URI 						Action 		Route Name
 * GET 			/rooms/{room}/bunks 		index 		rooms.bunks.index
 * POST 		/rooms/{room}/bunks 		store 		rooms.bunks.store
 * GET 			/bunks/{bunk} 				show 		bunks.show
 * PUT/PATCH 	/bunks/{bunk} 				update 		bunks.update
 * DELETE 		/bunks/{bunk} 				destroy 	bunks.destroy
*/

class BunkController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Room $room)
	{
		// curl api.example.test/rooms/1/bunks
		return Room::with('bunks')
			->find($room->id)
			->bunks;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request, Room $room)
	{
		// curl api.example.test/rooms/1/bunks -X POST -d "location=A"
		$validator = Validator::make(
			array_merge($request->all(), ["room_id" => $room->id]),
			[
				"location" => ['required', 'max:16', Rule::unique('bunks')->where('room_id', $room->id)],
				"room_id" => ["required", "exists:rooms,id"],
			]
		);
		if ($validator->fails()) {
			return $validator
				->errors()
				->toJson();
		}

		return Bunk::create($validator->validated())
			->save();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Bunk  $bunk
	 * @return \Illuminate\Http\Response
	 */
	public function show(Bunk $bunk)
	{
		// curl api.example.test/bunks/1
		return $bunk;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Bunk  $bunk
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Bunk $bunk)
	{
		// curl api.example.test/bunks/1 -X PUT -d "location=B"
		$validator = Validator::make(
			$request->all(),
			[
				"location" => ['required', 'max:16']
			]
		);
		if ($validator->fails()) {
			return $validator
				->errors()
				->toJson();
		}

		$location = $validator
			->validated()['location'];

		$bunkWithLocation = Room::findOrFail($bunk->room_id)
			->bunks()
			->where("location", $location)
			->first();

		if ($bunkWithLocation) {
			return $validator
				->errors()
				->add("location", "That location already exists in this room.")
				->toJson();
		}
		$bunk->location = $location;
		return $bunk->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Bunk  $bunk
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Bunk $bunk)
	{
		// curl api.example.test/bunks/2 -X DELETE
		return $bunk->delete();
	}
}
