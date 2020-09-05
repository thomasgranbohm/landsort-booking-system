import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Booking } from "../entities/Booking";
import { BookingResponse, BookingInput, CustomDate } from "../types";
import { INVALID_DATE } from "../strings";
import { Between, LessThanOrEqual, MoreThanOrEqual, getRepository } from "typeorm";
import { Bunk } from "../entities/Bunk";
import { User } from "../entities/User";

@Resolver()
export class BookingResolver {
	@Query(() => [Booking])
	bookings(): Promise<Booking[]> {
		return getRepository(Booking)
			.createQueryBuilder("booking")
			.innerJoinAndSelect("booking.bunk", "bunk")
			.innerJoinAndSelect("bunk.room", "room")
			.innerJoinAndSelect("booking.user", "user")
			.getMany();
	}

	@Query(() => Booking, { nullable: true })
	booking(
		@Arg('bookingId') uuid: string,): Promise<Booking | undefined> {
		return Booking.findOne(uuid);
	}

	@Mutation(() => BookingResponse, { nullable: true })
	async createBooking(
		@Arg('input') input: BookingInput
	): Promise<BookingResponse> {
		const { bunkId, endDateString, startDateString, userId } = input;

		let startDate = new CustomDate(startDateString),
			endDate = new CustomDate(endDateString);

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

		const bunk = await Bunk.findOne(bunkId);
		if (!bunk) {
			return {
				errors: [{
					argument: "bunk",
					message: "That bunk doesn't exist"
				}]
			}
		}

		const user = await User.findOne(userId)
		if (!user) {
			return {
				errors: [{
					argument: "user",
					message: "That user doesn't exist"
				}]
			}
		}

		console.log("------- DATES --------")
		console.log(startDate.toString(), endDate.toString())


		let dateAfterStart = startDate.getTomorrow()
		let dateBeforeEnd = endDate.getYesterday()
		console.log("------- DATES --------")
		console.log(startDate.toString(), endDate.toString())
		console.log(dateAfterStart.toString(), dateBeforeEnd.toString())

		const foundBooking = await Booking.findOne({
			where: [
				{
					bunk,
					startDate: LessThanOrEqual(startDate),
					endDate: MoreThanOrEqual(endDate)
				},
				{
					bunk,
					startDate: Between(startDate, dateBeforeEnd)
				},
				{
					bunk,
					endDate: Between(dateAfterStart, endDate)
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

		const booking = await Booking.create({ startDate, endDate, bunk, user }).save();
		return { booking };
	}

	@Mutation(() => Boolean)
	async deleteBooking(
		@Arg('bookingId') bookingId: string,
		@Arg('cancellationId') cancellationId: string
	): Promise<Boolean> {
		const booking = await Booking.findOne({ uuid: bookingId, cancellationId })
		if (!booking) return false;
		try {
			Booking.delete({ uuid: bookingId, cancellationId });
		} catch (err) {
			return false;
		}
		return true;
	}
}