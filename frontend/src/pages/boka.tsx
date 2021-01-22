import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import Heading from "../components/Heading/Heading";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import PageTitle from "../components/PageTitle/PageTitle";
import Steps from "../components/Steps/Steps";
import { APITypes, Dates } from "../components/types";
import createGetParameters from "../functions/createGetParameters";
import makeAPIRequest from "../functions/makeAPIRequest";
import mapToRooms from "../functions/mapToRooms";

const Boka = () => {
	const router = useRouter();

	const [rooms, setRooms] = useState<APITypes.Room[]>([]);
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

			const { errors, bunks } = await makeAPIRequest(
				`/bunks/available?${createGetParameters({
					start_date,
					end_date,
				})}`
			);

			setDates({
				arrival: start_date as string,
				departure: end_date as string,
			});

			if (errors) {
				alert(JSON.stringify(errors));
			} else {
				const rooms: APITypes.Room[] = mapToRooms(bunks);

				setRooms(rooms as APITypes.Room[]);
			}

			setIsLoading(false);
		};
		asyncFunction();
	}, [router.query]);

	return (
		<main>
			<PageTitle>Boka</PageTitle>
			<HorizontalRule />
			{!isLoading ? (
				<>
					<DateRangeHeader
						arrival={dates.arrival}
						departure={dates.departure}
					/>
					<HorizontalRule />
					{rooms && rooms.length > 0 ? (
						<Steps
							dates={{
								arrival: dates.arrival,
								departure: dates.departure,
							}}
							rooms={rooms}
						/>
					) : (
						<Heading>
							Finns inga rum i det valda intervallet.
						</Heading>
					)}
				</>
			) : (
				<LoadingSpinner />
			)}
		</main>
	);
};

export default Boka;
