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
					type: "error",
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

	const confirmBooking = async () => {
		const { errors } = await makeAPIRequest(
			`/bookings/${bookingId}/confirm`
		);
		if (errors) {
			handleModal({
				type: "error",
				data: parseError(errors),
			});
		} else {
			handleModal({
				title: "Bokning godkänd!",
				type: "success",
				data: "Din bokning är nu godkänd. Välkommen!",
				buttonText: "Tillbaka till start",
				onClose: () => router.push("/"),
			});
		}
	};

	const cancelBooking = async () => {
		const { errors } = await makeAPIRequest(
			`/bookings/${bookingId}/cancel`
		);
		if (errors) {
			handleModal({
				type: "error",
				data: parseError(errors),
			});
		} else {
			handleModal({
				type: "success",
				title: "Bokning avbokad!",
				data: "Din bokning är nu avbokad.",
				buttonText: "Tillbaka till start",
				onClose: () => router.push("/"),
			});
		}
	};

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
						{}
						<Button
							customType="return"
							withoutContent
							inline
							onClick={cancelBooking}
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
