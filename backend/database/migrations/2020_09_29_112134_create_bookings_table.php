<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bookings', function (Blueprint $table) {
			$table->uuid("id")
				->primary();
			$table->date("start_date");
			$table->date("end_date");
			$table->unsignedBigInteger('bunk_id');
			$table->foreign('bunk_id')
				->references('id')
				->on('bunks')
				->onDelete('cascade');
			$table->uuid('user_id');
			$table->foreign('user_id')
				->references('id')
				->on('users');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('bookings');
	}
}
