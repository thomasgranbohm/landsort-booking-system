<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\MessageBag;

class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	protected function respond($variables, $status = 200, $headers = [], $options = 0)
	{
		return response()->json($variables, $status, $headers, $options);
	}

	protected function errors($errors, $status = 400,  $headers = [], $options = 0)
	{
		return $this->respond(
			["errors" => $errors],
			$status,
			$headers,
			$options
		);
	}

	protected function removeOutOfDate()
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

	protected function getBookingsInRange(
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
}
