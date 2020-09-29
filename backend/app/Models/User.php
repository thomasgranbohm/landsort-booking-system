<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
	use HasFactory, UsesUuid;

	protected $fillable = [
		'firstname',
		'lastname',
		'email',
		'phonenumber'
	];

	public function bookings()
	{
		return $this->hasMany("App\Models\Booking");
	}
}
