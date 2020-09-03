import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { Booking } from "../entities/Booking";
import { DatabaseContext, BookingResponse } from "../types";
import { INVALID_DATE } from "../strings";

@Resolver()
export class BookingResolver {
	@Query(() => [Booking])
	bookings(
		@Ctx() { em }: DatabaseContext
	): Promise<Booking[]> {
		return em.find(Booking, {});
	}

	@Query(() => Booking, { nullable: true })
	booking(
		@Arg('bookingID') uuid: string,
		@Ctx() { em }: DatabaseContext
	): Promise<Booking | null> {
		return em.findOne(Booking, { uuid });
	}

	@Mutation(() => BookingResponse, { nullable: true })
	async createBooking(
		@Arg('startDate') startDateString: string,
		@Arg('endDate') endDateString: string,
		@Arg('bunkID') bunkID: number,
		@Ctx() { em }: DatabaseContext
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

		if (startDate > endDate)
			return {
				errors: [{
					argument: "startDate",
					message: "startDate cannot come after endDate"
				}]
			};

		// FÅR inte alla
		// const foundBooking = await em.findOne(
		// 	Booking,
		// 	{
		// 		$and: [
		// 			{ bunk: bunkID },
		// 			{
		// 				$or: [
		// 					{
		// 						startDate: { $lte: startDate },
		// 						endDate: { $gte: startDate }
		// 					},
		// 					{
		// 						startDate: { $lte: startDate },
		// 						endDate: { $gte: endDate }
		// 					},
		// 					{
		// 						$and: [
		// 							{
		// 								$and: [
		// 									{
		// 										startDate: { $gte: startDate },
		// 									},
		// 									{
		// 										startDate: { $lte: endDate },
		// 									}
		// 								]
		// 							},
		// 							{
		// 								$and: [
		// 									{
		// 										endDate: { $gte: startDate },
		// 									},
		// 									{
		// 										endDate: { $lte: endDate },
		// 									}
		// 								]
		// 							},
		// 						]
		// 					}
		// 				]
		// 			}
		// 		]
		// 	}
		// );
		const foundBooking = await em.findOne(
			Booking,
			{
				$and: [
					{ bunk: bunkID },
					{
						$or: [
							{
								$or: [
									{
										$and: [
											{ startDate: { $gte: startDate } },
											{ startDate: { $lt: endDate } }
										]
									},
									{
										$and: [
											{ endDate: { $gte: startDate } },
											{ endDate: { $lt: endDate } }
										]
									},
								]
							},
							{
								$and: [
									{ startDate: { $lte: startDate } },
									{ endDate: { $gte: endDate } },
								]
							}
						]
					}
				]
			}
		).catch((err) => console.error("Errore.", err));


		if (foundBooking) {
			return {
				errors: [{
					argument: "Date",
					message: "Bunk already taken in given interval"
				}]
			}
		}

		const booking = em.create(Booking, { startDate, endDate, bunk: bunkID });
		try {
			await em.persistAndFlush(booking);
		} catch (err) {
			console.error(err)
			return {
				errors: [{
					argument: "Error",
					message: "Wok"
				}]
			};
		}
		return { booking };
	}

	@Mutation(() => Boolean)
	async deleteBooking(
		@Arg('bookingID') bookingID: string,
		@Ctx() { em }: DatabaseContext
	): Promise<Boolean> {
		try {
			em.nativeDelete(Booking, { uuid: bookingID });
		} catch (err) {
			return false;
		}
		return true;
	}
}