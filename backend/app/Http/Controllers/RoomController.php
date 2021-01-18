<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Bunk;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Contracts\Service\Attribute\Required;

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
		// curl localhost:8080/api/rooms
		return Room::with('bunks')->get();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// curl localhost:8080/api/rooms -X POST -d "location=A"
		$validator = Validator::make($request->toArray(), [
			'location' => 'required|unique:rooms|min:1|max:16'
		]);
		if ($validator->fails())
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');

		return Room::create($validator->validated())
			->save();
	}

	public function available(Request $request)
	{
		$validator = Validator::make(
			$request->all(),
			[
				"start_date" => ["required", "date"],
				"end_date" => ["required", "date"],
			]
		);

		if ($validator->fails()) {
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');
		}

		$start_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['start_date'])));
		$end_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['end_date'])));

		if ($start_date > $end_date || $start_date == $end_date) {
			$validator
				->errors()
				->add("end_date", "The end date cannot be before or the same as the start date.");
		}

		$dateAfterStart = date('Y-m-d', strtotime($start_date . " +1 day"));
		$dateBeforeEnd = date('Y-m-d', strtotime($end_date . " -1 day"));

		$availableBunks = Room::with("bunks:id,location")
			->whereHas(
				"bunks.bookings",
				function (Builder $builder) use ($dateAfterStart, $dateBeforeEnd, $start_date, $end_date) {
					$builder
						->where([
							["start_date", "<=", $start_date],
							["end_date", ">=", $end_date],
						])
						->orWhereBetween("start_date", [$start_date, $dateBeforeEnd])
						->orWhereBetween("end_date", [$dateAfterStart, $end_date]);
				}
			)->get();

		if ($validator->errors()->isNotEmpty()) {
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');
		}

		return $availableBunks;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Room  $room
	 * @return \Illuminate\Http\Response
	 */
	public function show(Room $room)
	{
		// curl localhost:8080/api/rooms/1
		return $room::where("id", $room->id)->with('bunks')->first();
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
		// curl localhost:8080/api/rooms/1 -X PUT -d "location=D"
		$validator = Validator::make($request->toArray(), [
			'location' => 'required|unique:rooms|max:16'
		]);
		if ($validator->fails())
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');;

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
		// curl localhost:8080/api/rooms/1 -X DELETE
		return $room->delete();
	}
}
