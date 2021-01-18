import { GetServerSideProps } from "next";
import Bookings from "../components/BookingContainer/BookingContainer";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import Heading from "../components/Heading/Heading";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import PageTitle from "../components/PageTitle/PageTitle";
import { APITypes } from "../components/types";
import createGetParameters from "../functions/createGetParameters";
import makeAPIRequest from "../functions/makeAPIRequest";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { ankomstdatum: start_date, avresedatum: end_date } = query;

	const bookings = await makeAPIRequest(
		`/bookings?${createGetParameters({
			start_date,
			end_date,
		})}`
	);

	console.log(bookings);

	return {
		props: {
			bookings,
			start_date: start_date || null,
			end_date: end_date || null,
		},
	};
};

type Props = {
	bookings: APITypes.Booking[];
	start_date: any | undefined;
	end_date: any | undefined;
};

const Bokningsläget = (props: Props) => {
	const { bookings, start_date, end_date } = props;
	return (
		<div>
			<PageTitle>Bokningsläget</PageTitle>
			<HorizontalRule />
			<DateRangeHeader arrival={start_date} departure={end_date} />
			<HorizontalRule />
			<Heading type="h2">Bokade platser</Heading>
			<Bookings bookings={bookings} />
		</div>
	);
};

export default Bokningsläget;
