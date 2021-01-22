<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
	use HasFactory;

	protected $fillable = ['location'];

	protected $visible = [
		"id",
		"location",
		"bunks"
	];

	public function bunks()
	{
		return $this->hasMany("App\Models\Bunk");
	}
}
