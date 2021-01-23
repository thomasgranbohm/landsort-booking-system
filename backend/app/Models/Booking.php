<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{
	use HasFactory, UsesUuid;

	protected $fillable = [
		"start_date",
		"end_date",
		"bunks",
		"user_id",
		"confirmed"
	];

	protected $attributes = [
		"confirmed" => false
	];

	protected $visible = [
		"user",
		"bunks",
		"start_date",
		"end_date",
		"confirmed",
	];

	protected static function boot()
	{
		parent::boot();

		static::creating(function ($booking) {
			if (!$booking->getKey()) {
				$booking->{$booking->getKeyName()} = (string) Str::uuid();
			}
		});
	}

	public function user()
	{
		return $this->belongsTo("App\Models\User");
	}

	public function bunks()
	{
		return $this->belongsToMany("App\Models\Bunk");
	}
}
