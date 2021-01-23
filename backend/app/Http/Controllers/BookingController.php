<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationMail;
use App\Models\Booking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator as Validator;

class BookingController extends Controller
{
	public function index(Request $request)
	{
		$this->removeOutOfDate();
		if (count($request->all()) === 0) return Booking::with(['bunks', 'bunks.room', 'user'])->get();

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

		$bookings = $this->getBookingsInRange($start_date, $end_date, $dateBeforeEnd, $dateAfterStart);

		if ($validator->errors()->isNotEmpty()) {
			return $this->errors($validator->errors());
		}

		return $this->respond(array("bookings" => $bookings));
	}

	public function store(Request $request)
	{
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
			return $this->errors($validator->errors());
		}

		$bunks = $validator->validated()['bunks'];
		$user_email = strtolower(trim($validator->validated()['user_email']));
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

		$bookingsInRange = $this->getBookingsInRange($start_date, $end_date, $dateBeforeEnd, $dateAfterStart, $bunks);

		if (count($bookingsInRange) !== 0) {
			$validator
				->errors()
				->add("dates", "Bunks not available in this date ranges.");
		};

		if ($validator->errors()->isNotEmpty()) {
			return $this->errors($validator->errors());
		}

		$booking = Booking::create([
			"start_date" => $start_date,
			"end_date" => $end_date,
			"user_id" => $user->id
		]);
		$booking_id = $booking->id;
		$booking->bunks()->sync($bunks);
		Mail::to($user_email)->send(new ConfirmationMail(Booking::find($booking_id)));
		$booking->save();

		return $this->respond(
			array(
				"booking" => Booking::where("id", $booking->id)
					->with("user", "bunks", "bunks.room")
					->first(["id", "start_date", "end_date", "user_id"])
			)
		);
	}

	public function show(Booking $booking)
	{
		$this->removeOutOfDate();
		try {
			$booking = Booking::where('id', $booking->id)
				->with(['bunks', 'bunks.room', 'user'])
				->firstOrFail();
			return $this->respond(array("booking" => $booking));
		} catch (\Throwable $th) {
			return $this->errors(["booking" => "Could not find booking."]);
		}
	}

	public function confirm($booking_id)
	{
		try {
			$booking = Booking::findOrFail($booking_id);
			$booking->confirmed = true;
			return $this->respond(["confirmed" => $booking->save()]);
		} catch (ModelNotFoundException $ex) {
			return $this->errors(["booking" => "Could not find booking with that confirmation token."]);
		}
	}

	public function cancel($booking_id)
	{
		try {
			$booking = Booking::findOrFail($booking_id);
			return $this->respond(["deleted" => $booking->delete()]);
		} catch (ModelNotFoundException $ex) {
			return $this->errors(["booking" => "Could not find a booking with that cancellation token."]);
		};
	}
}
