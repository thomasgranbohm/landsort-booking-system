<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as Validator;

class BookingController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		// curl api.example.test/bookings/
		return Booking::all();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// curl api.example.test/bookings/ -X POST -d "bunk_id=1&start_date=2020-10-01&end_date=2020-10-15"
		$validator = Validator::make(
			$request->all(),
			[
				"bunk_id" => ["required", "exists:bunks,id"],
				"start_date" => ["required", "date"],
				"end_date" => ["required", "date"]
			]
		);

		if ($validator->fails()) {
			return $validator
				->errors()
				->toJson();
		}

		$bunk_id = $validator->validated()['bunk_id'];
		$start_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['start_date'])));
		$end_date = Carbon::parse(date('Y-m-d', strtotime($validator->validated()['end_date'])));

		if ($start_date > $end_date || $start_date == $end_date) {
			$validator
				->errors()
				->add("end_date", "The end date cannot be before or the same as the start date.");
		}

		$dateAfterStart = date('Y-m-d', strtotime($start_date . " +1 day"));
		$dateBeforeEnd = date('Y-m-d', strtotime($end_date . " -1 day"));


		// TODO figure out variable scoping
		/*
		Booking::where(function ($query) {
			$query
				->where("bunk_id", $bunk_id)
				->whereBetween("start_date", [$start_date, $dateBeforeEnd]);
		})->get();
		*/
		$bookingsInRange = [
			...Booking::where([
				["bunk_id", $bunk_id],
				["start_date", "<=", $start_date],
				["end_date", ">=", $end_date]
			])->get(),
			...Booking::where("bunk_id", $bunk_id)
				->whereBetween("start_date", [$start_date, $dateBeforeEnd])->get(),
			...Booking::where("bunk_id", $bunk_id)
				->whereBetween("end_date", [$dateAfterStart, $end_date])->get(),
		];

		if (!empty($bookingsInRange) || sizeof($bookingsInRange) !== 0) {
			$validator
				->errors()
				->add("dates", "Booking already exists in this date range.");
		};

		if ($validator->errors()->isNotEmpty()) {
			return $validator
				->errors()
				->toJson();
		}

		return Booking::create([
			"start_date" => $start_date,
			"end_date" => $end_date,
			"bunk_id" => $bunk_id
		])->save();
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Booking  $booking
	 * @return \Illuminate\Http\Response
	 */
	public function show(Booking $booking)
	{
		// curl api.example.test/booking/{uuid}
		return $booking;
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

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Booking  $booking
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Booking $booking)
	{
		// curl api.example.test/booking/{uuid} -X DELETE
		return $booking->delete();
	}
}
