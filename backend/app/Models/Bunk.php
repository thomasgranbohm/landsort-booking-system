<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bunk extends Model
{
	use HasFactory;

	protected $fillable = ['location', 'room_id'];

	public function room()
	{
		return $this->belongsTo("App\Models\Room");
	}

	public function bookings()
	{
		return $this->belongsToMany("App\Models\Booking");
	}
}
