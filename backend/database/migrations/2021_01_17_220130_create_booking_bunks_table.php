<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingBunksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('booking_bunk', function (Blueprint $table) {
			$table->bigIncrements("id");
			$table->uuid("booking_id");
			$table->unsignedBigInteger("bunk_id");
			$table->timestamps();

			$table->unique((["booking_id", "bunk_id"]));

			$table->foreign("booking_id")->references("id")->on("bookings")->onDelete("cascade");
			$table->foreign("bunk_id")->references("id")->on("bunks")->onDelete("cascade");
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('booking_bunk');
	}
}
