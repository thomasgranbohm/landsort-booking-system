import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Booking } from "../entities/Booking";
import { BookingResponse } from "../types";
import { INVALID_DATE } from "../strings";
import { Between, LessThanOrEqual, MoreThanOrEqual, getRepository } from "typeorm";
import { Bunk } from "../entities/Bunk";

@Resolver()
export class BookingResolver {
	@Query(() => [Booking])
	bookings(): Promise<Booking[]> {
		return getRepository(Booking)
			.createQueryBuilder("booking")
			.innerJoinAndSelect("booking.bunk", "bunk")
			.innerJoinAndSelect("bunk.room", "room")
			.getMany();
	}

	@Query(() => Booking, { nullable: true })
	booking(
		@Arg('bookingID') uuid: string,): Promise<Booking | undefined> {
		return Booking.findOne(uuid);
	}

	@Mutation(() => BookingResponse, { nullable: true })
	async createBooking(
		@Arg('startDate') startDateString: string,
		@Arg('endDate') endDateString: string,
		@Arg('bunkID') bunkID: number
	): Promise<BookingResponse> {
		let startDate = new Date(startDateString),
			endDate = new Date(endDateString);

		if (startDate.toString() === INVALID_DATE || endDate.toString() === INVALID_DATE) {
			let wrongDate = startDate.toString() === INVALID_DATE ? "startDate" : "endDate";
			return {
				errors: [{
					argument: wrongDate,
					message: `${wrongDate} is not a date`
				}]
			}
		}

		if (startDate > endDate) {
			return {
				errors: [{
					argument: "startDate",
					message: "startDate cannot come after endDate"
				}]
			};
		}

		const bunk = await Bunk.findOne(bunkID);
		if (!bunk) {
			return {
				errors: [{
					argument: "bunk",
					message: "That bunk doesn't exist"
				}]
			}
		}

		const foundBooking = await Booking.findOne({
			where: [
				{
					bunk,
					startDate: LessThanOrEqual(startDate),
					endDate: MoreThanOrEqual(endDate)
				},
				{
					bunk,
					startDate: Between(startDate, endDate)
				},
				{
					bunk,
					endDate: Between(startDate, endDate)
				},
			]
		});

		if (foundBooking) {
			return {
				errors: [{
					argument: "Date",
					message: "Bunk already taken in given interval"
				}]
			}
		}

		const booking = await Booking.create({ startDate, endDate, bunk }).save();
		return { booking };
	}

	@Mutation(() => Boolean)
	async deleteBooking(
		@Arg('bookingID') bookingID: string
	): Promise<Boolean> {
		try {
			Booking.delete({ uuid: bookingID });
		} catch (err) {
			return false;
		}
		return true;
	}
}