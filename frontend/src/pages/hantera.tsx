import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import Booking from "../components/Booking/Booking";
import Button from "../components/Button/Button";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import HorizontalDivider from "../components/HorizontalDivider/HorizontalDivider";
import Loader from "../components/Loader/Loader";
import { ModalContext, ModalTypes } from "../components/Modal/Modal";
import makeAPIRequest from "../functions/makeAPIRequest";
import { APITypes } from "../types";

const Hantera = () => {
	const router = useRouter();
	const { handleModal } = useContext<ModalTypes>(ModalContext);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [booking, setBooking] = useState<APITypes.Booking>(undefined);
	const [bookingId, setBookingId] = useState<string>(undefined);

	useEffect(() => {
		const asyncFunction = async () => {
			const { bokningsId: bookingId } = router.query;
			if (!bookingId) return;

			setIsLoading(true);

			const { booking, handledError } = await makeAPIRequest(
				`/bookings/${bookingId}`,
				{
					handleModal,
					modalState: {
						onClose: () => router.push("/"),
					},
				}
			);

			if (!handledError) {
				setBookingId(bookingId as string);
				setBooking(booking);
			}

			setIsLoading(false);
		};
		asyncFunction();
	}, [router.query]);

	const confirmBooking = async () => {
		const { handledError } = await makeAPIRequest(
			`/bookings/${bookingId}/confirm`
		);
		if (!handledError) {
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
		const { handledError } = await makeAPIRequest(
			`/bookings/${bookingId}/cancel`
		);
		if (!handledError) {
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
						{!booking.confirmed && (
							<Button
								customType="continue"
								withoutContent
								inline
								onClick={confirmBooking}
							>
								Godkänn bokning
							</Button>
						)}
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
