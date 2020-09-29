<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
	use HasFactory, UsesUuid;

	protected $fillable = [
		"start_date",
		"end_date",
		"bunk_id",
		"user_id"
	];

	public function user()
	{
		return $this->belongsTo("App\Models\User");
	}

	public function bunk()
	{
		return $this->belongsTo("App\Models\Bunk");
	}
}
