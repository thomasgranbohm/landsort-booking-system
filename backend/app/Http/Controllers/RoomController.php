<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Bunk;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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
	public function index()
	{
		return $this->respond(["rooms" => Room::with('bunks')->get()]);
	}

	public function store(Request $request)
	{
		$validator = Validator::make($request->toArray(), [
			'location' => 'required|unique:rooms|min:1|max:16'
		]);
		if ($validator->fails())
			return $this->errors($validator->errors()->toJson());

		return $this->respond([
			"created" => Room::create($validator->validated())
				->save()
		]);
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
			return $this->errors($validator->errors()->toJson());
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
			return $this->errors($validator->errors()->toJson());
		}

		return $this->respond(["bunks" => $availableBunks]);
	}

	public function show(Room $room)
	{
		return $this->respond(["room" => $room::where("id", $room->id)->with('bunks')->first()]);
	}

	public function update(Request $request, Room $room)
	{
		$validator = Validator::make($request->toArray(), [
			'location' => 'required|unique:rooms|max:16'
		]);
		if ($validator->fails())
			return $this->errors($validator->errors()->toJson());

		$room->location = $validator->validated()['location'];

		return $this->respond(["updated" => $room->save()]);
	}

	public function destroy(Room $room)
	{
		return $this->respond(["deleted" => $room->delete()]);
	}
}
