import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import Bookings from "../components/BookingContainer/BookingContainer";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import Heading from "../components/Heading/Heading";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import PageTitle from "../components/PageTitle/PageTitle";
import { APITypes, Dates } from "../components/types";
import createGetParameters from "../functions/createGetParameters";

const Bokningsläget: React.FC = () => {
	const router = useRouter();

	const [bookings, setBookings] = useState<APITypes.Booking[]>([]);
	const [dates, setDates] = useState<Dates>(undefined);
	const [isLoading, setIsLoading] = useState<Boolean>(true);
	useEffect(() => {
		const asyncFunction = async () => {
			try {
				const {
					ankomstdatum: start_date,
					avresedatum: end_date,
				} = router.query;

				if (!start_date || !end_date) return;

				setIsLoading(true);

				const resp = await axios(
					`http://${
						process.env.API_URL
					}/bookings?${createGetParameters({
						start_date,
						end_date,
					})}`
				);
				const { bookings } = resp.data;

				setDates({
					arrival: start_date as string,
					departure: end_date as string,
				});
				setBookings(bookings as APITypes.Booking[]);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				alert(error.message);
			}
		};
		asyncFunction();
	}, [router.query]);

	return (
		<main>
			<PageTitle>Bokningsläget</PageTitle>
			<HorizontalRule />
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
