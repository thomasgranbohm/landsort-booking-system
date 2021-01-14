import { GetServerSideProps } from "next";
import Bookings from "../components/BookingContainer/BookingContainer";
import Heading from "../components/Heading/Heading";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import PageTitle from "../components/PageTitle/PageTitle";
import { APITypes } from "../components/types";
import createGetParameters from "../functions/createGetParameters";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { ankomstdatum: start_date, avresedatum: end_date } = query;

	const resp = await fetch(
		`http://localhost:8080/api/bookings?${createGetParameters({
			start_date,
			end_date,
		})}`
	);
	const bookings: APITypes.Booking[] = await resp.json();
	console.log(start_date, end_date);

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
		<>
			<PageTitle>Bokningsläget</PageTitle>
			<HorizontalRule />
			{start_date} {end_date}
			<HorizontalRule />
			<div>
				<Heading type="h2">Bokade platser</Heading>
				<Bookings bookings={bookings} />
			</div>
		</>
	);
};

export default Bokningsläget;
