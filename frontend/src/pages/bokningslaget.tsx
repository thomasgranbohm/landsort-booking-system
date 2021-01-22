import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Bookings from "../components/BookingContainer/BookingContainer";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import Heading from "../components/Heading/Heading";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { ModalContext, ModalTypes } from "../components/Modal/Modal";
import PageTitle from "../components/PageTitle/PageTitle";
import { APITypes, Dates } from "../components/types";
import createGetParameters from "../functions/createGetParameters";
import makeAPIRequest from "../functions/makeAPIRequest";
import parseError from "../functions/parseError";

const Bokningsläget: React.FC = () => {
	const router = useRouter();
	const { handleModal } = useContext<ModalTypes>(ModalContext);

	const [bookings, setBookings] = useState<APITypes.Booking[]>([]);
	const [dates, setDates] = useState<Dates>(undefined);
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	useEffect(() => {
		const asyncFunction = async () => {
			const {
				ankomstdatum: start_date,
				avresedatum: end_date,
			} = router.query;

			if (!start_date || !end_date) return;

			setIsLoading(true);

			const { errors, bookings } = await makeAPIRequest(
				`/bookings?${createGetParameters({
					start_date,
					end_date,
				})}`
			);

			setDates({
				arrival: start_date as string,
				departure: end_date as string,
			});

			if (errors) {
				handleModal({
					error: true,
					data: parseError(JSON.parse(errors)),
				});
			} else {
				setBookings(bookings as APITypes.Booking[]);
			}

			setIsLoading(false);
		};
		asyncFunction();
	}, [router.query]);

	return (
		<main>
			<PageTitle>Bokningsläget</PageTitle>
			{!isLoading ? (
				<>
					<DateRangeHeader
						arrival={dates.arrival}
						departure={dates.departure}
					/>
					<HorizontalRule />
					{bookings && bookings.length > 0 ? (
						<>
							<Heading type="h2">Bokade platser</Heading>
							<Bookings bookings={bookings} />
						</>
					) : (
						<>
							<Heading type="h2">
								Finns inga bokningar i intervallet.
							</Heading>
							<Link href="/">Tillbaka till start.</Link>
						</>
					)}
				</>
			) : (
				<LoadingSpinner />
			)}
		</main>
	);
};

export default Bokningsläget;
