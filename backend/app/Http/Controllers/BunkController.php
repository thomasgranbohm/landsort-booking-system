<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Bunk;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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
	public function index(Room $room)
	{
		return Room::with('bunks:id,location,room_id', 'bunks.bookings:id,start_date,end_date,user_id', 'bunks.bookings.user:id,firstname,lastname')
			->find($room->id)
			->bunks;
	}

	public function show(Bunk $bunk)
	{
		return $bunk::where("id", $bunk->id)->with('room', 'bookings')->first();
	}

	public function store(Request $request, Room $room)
	{
		$validator = Validator::make(
			array_merge($request->all(), ["room_id" => $room->id]),
			[
				"location" => ['required', 'max:16', Rule::unique('bunks')->where('room_id', $room->id)],
				"room_id" => ["required", "exists:rooms,id"],
			]
		);
		if ($validator->fails()) {
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');
		}

		return Bunk::create($validator->validated())
			->save();
	}

	public function available(Request $request)
	{
		$this->removeOutOfDate();
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

		$availableBunks = Bunk::with("room:id,location")
			->whereDoesntHave(
				"bookings",
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

		return response(array("bunks" => $availableBunks), 200)->header('Content-Type', 'application/json');
	}

	public function update(Request $request, Bunk $bunk)
	{
		$validator = Validator::make(
			$request->all(),
			[
				"location" => ['required', 'max:16']
			]
		);
		if ($validator->fails()) {
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');
		}

		$location = $validator
			->validated()['location'];

		$bunkWithLocation = Room::findOrFail($bunk->room_id)
			->bunks()
			->where("location", $location)
			->first();

		if ($bunkWithLocation) {
			return array(
				"errors" => $validator
					->errors()
					->add("location", "That location already exists in this room.")
			);
		}
		$bunk->location = $location;
		return $bunk->save();
	}

	public function destroy(Bunk $bunk)
	{
		return $bunk->delete();
	}

	private function removeOutOfDate()
	{
		try {
			foreach (Booking::where("confirmed", false)
				->where('created_at', '<', now()->subMinutes(config('global.confirmation_period')))
				->get() as $bunk) {
				$bunk->delete();
			}
			return true;
		} catch (\Throwable $th) {
			return false;
		}
	}
}
