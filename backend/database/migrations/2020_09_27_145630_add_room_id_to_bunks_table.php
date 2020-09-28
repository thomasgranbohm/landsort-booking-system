<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoomIdToBunksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('bunks', function (Blueprint $table) {
			$table->unsignedBigInteger('room_id');
			$table->foreign('room_id')
				->references('id')
				->on('rooms')
				->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('bunks', function (Blueprint $table) {
			//
		});
	}
}
