<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmationMail extends Mailable implements ShouldQueue
{
	use Queueable, SerializesModels;

	protected $booking;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(Booking $booking)
	{
		//
		$this->booking = $booking;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this
			->view('emails.confirmation', [
				"id" => $this->booking->id,
				"arrival" => $this->booking->start_date,
				"departure" => $this->booking->end_date,
				"bunks" => $this->booking->bunks,
				"user" => $this->booking->user,
			])
			->subject("Godkänn din bokning");
	}
}
