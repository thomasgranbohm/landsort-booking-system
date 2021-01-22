import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import Booking from "../../components/Booking/Booking";
import Button from "../../components/Button/Button";
import DateRangeHeader from "../../components/DateRangeHeader/DateRangeHeader";
import HorizontalDivider from "../../components/HorizontalDivider/HorizontalDivider";
import Loader from "../../components/Loader/Loader";
import { ModalContext, ModalTypes } from "../../components/Modal/Modal";
import { APITypes } from "../../components/types";
import makeAPIRequest from "../../functions/makeAPIRequest";
import parseError from "../../functions/parseError";

const Hantera = () => {
	const router = useRouter();
	const { handleModal } = useContext<ModalTypes>(ModalContext);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [booking, setBooking] = useState<APITypes.Booking>(undefined);
	const [bookingId, setBookingId] = useState<string>(undefined);

	useEffect(() => {
		const asyncFunction = async () => {
			const { bookingId } = router.query;
			if (!bookingId) return;

			setIsLoading(true);

			const { booking, errors } = await makeAPIRequest(
				`/bookings/${bookingId}`
			);

			if (errors) {
				handleModal({
					error: true,
					data: parseError(JSON.parse(errors)),
				});
			} else {
				setBookingId(bookingId as string);
				setBooking(booking);

				setIsLoading(false);
			}
		};
		asyncFunction();
	}, [router.query]);

	return (
		<Loader isLoading={isLoading}>
			{booking && (
				<HorizontalDivider>
					<DateRangeHeader
						arrival={booking.start_date}
						departure={booking.end_date}
					/>
					<Booking booking={booking} />
					<div>
						<Button
							customType="continue"
							withoutContent
							inline
							onClick={async () => {
								const {
									errors,
									...rest
								} = await makeAPIRequest(
									`/bookings/${bookingId}/confirm`
								);
								if (errors) {
									handleModal({
										error: true,
										data: parseError(errors),
									});
								} else {
									console.log("rest", rest);
								}
							}}
						>
							Godkänn bokning
						</Button>
						<Button
							customType="return"
							withoutContent
							inline
							onClick={async () => {
								const {
									errors,
									...rest
								} = await makeAPIRequest(
									`/bookings/${bookingId}/cancel`
								);
								if (errors) {
									handleModal({
										error: true,
										data: parseError(errors),
									});
								} else {
									console.log("rest", rest);
								}
							}}
						>
							Avboka bokning
						</Button>
					</div>
				</HorizontalDivider>
			)}
		</Loader>
	);
};

export default Hantera;
