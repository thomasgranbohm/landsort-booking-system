<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as Validator;

function getBookingsInRange(
	$start_date,
	$end_date,
	$dateBeforeEnd,
	$dateAfterStart,
	$bunks = null
) {
	$base = Booking::with(
		"user:id,firstname,lastname,email",
		"bunks:id,location,room_id",
		"bunks.room:id,location"
	);


	if ($bunks != null) {
		$base
			->whereHas('bunks', function (Builder $builder) use ($bunks) {
				$builder->whereIn("bunk_id", $bunks);
			});
	}

	return $base
		->where(function ($query) use ($start_date, $end_date, $dateAfterStart, $dateBeforeEnd) {
			$query->where([
				["start_date", "<=", $start_date],
				["end_date", ">=", $end_date]
			])
				->orWhereBetween("start_date", [$start_date, $dateBeforeEnd])
				->orWhereBetween("end_date", [$dateAfterStart, $end_date]);
		})
		->get();
}

class BookingController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		// curl localhost:8080/api/bookings/
		if (count($request->all()) === 0) return Booking::with(['bunks', 'user'])->get();

		$validator = Validator::make(
			$request->all(),
			[
				"start_date" => ["required", "date"],
				"end_date" => ["required", "date"],
			]
		);

		$start_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['start_date'])));
		$end_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['end_date'])));

		if ($start_date > $end_date || $start_date == $end_date) {
			$validator
				->errors()
				->add("end_date", "The end date cannot be before or the same as the start date.");
		}

		$dateAfterStart = date('Y-m-d', strtotime($start_date . " +1 day"));
		$dateBeforeEnd = date('Y-m-d', strtotime($end_date . " -1 day"));

		$bookings = getBookingsInRange($start_date, $end_date, $dateBeforeEnd, $dateAfterStart);

		if ($validator->errors()->isNotEmpty()) {
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');
		}

		return response(array("bookings" => $bookings), 200)->header('Content-Type', 'application/json');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// curl localhost:8080/api/bookings/ -X POST -d "bunk_id=1&start_date=2021-01-01&end_date=2021-01-15&user_email=thomas@granbohm.dev"
		$validator = Validator::make(
			$request->all(),
			[
				"bunks" => ["required", "array", "min:1"],
				"bunks.*" => ["required", "exists:bunks,id", "distinct"],
				"user_email" => ["required", "exists:users,email"],
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

		$bunks = $validator->validated()['bunks'];
		$user_email = $validator->validated()['user_email'];
		$start_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['start_date'])));
		$end_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['end_date'])));

		if ($start_date > $end_date || $start_date == $end_date) {
			$validator
				->errors()
				->add("end_date", "The end date cannot be before or the same as the start date.");
		}

		$user = User::where("email", $user_email)->first();

		$dateAfterStart = date('Y-m-d', strtotime($start_date . " +1 day"));
		$dateBeforeEnd = date('Y-m-d', strtotime($end_date . " -1 day"));

		$bookingsInRange = getBookingsInRange($start_date, $end_date, $dateBeforeEnd, $dateAfterStart, $bunks);

		if (count($bookingsInRange) !== 0) {
			$validator
				->errors()
				->add("dates", "Bunks not available in this date ranges.");
		};

		if ($validator->errors()->isNotEmpty()) {
			return response(array(
				"errors" => $validator
					->errors()
			), 400)
				->header('Content-Type', 'application/json');
		}

		$booking = Booking::create([
			"start_date" => $start_date,
			"end_date" => $end_date,
			"user_id" => $user->id
		]);
		$booking->bunks()->sync($bunks);
		$booking->save();
		return response(
			array(
				"booking" => Booking::where("id", $booking->id)
					->with("user:id,firstname,lastname,email", "bunks:id,location,room_id", "bunks.room:id,location")
					->first(["id", "start_date", "end_date", "user_id"])
			),
			200
		)
			->header('Content-Type', 'application/json');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Booking  $booking
	 * @return \Illuminate\Http\Response
	 */
	public function show(Booking $booking)
	{
		// curl localhost:8080/api/booking/{uuid}
		return Booking::where('id', $booking->id)
			->with(['bunks:id,location,room_id', 'user:id,firstname,lastname,email,phonenumber', 'bunks.room:id,location'])
			->first(['id', 'start_date', 'end_date', 'user_id']);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Booking  $booking
	 * @return \Illuminate\Http\Response
	 */

	// public function update(Request $request, Booking $booking)
	// {

	// }

	public function cancel($cancellation_token)
	{
		try {
			$booking = Booking::with("bunks:id,location,room_id", "bunks.room:id,location", "user:id,firstname,lastname")
				->where("cancellation_token", $cancellation_token)
				->select(["id", "start_date", "end_date", "user_id"])
				->firstOrFail();
			if (isset($_GET["noCancel"])) {
				return response(array("booking" => $booking), 200);
			}
			return $booking->delete();
		} catch (ModelNotFoundException $ex) {
			return response(array("errors" => array("booking" => "Could not find a booking with that cancellation token.")));
		};
	}
}
