import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { dissoc, dissocPath } from "ramda";
import { useEffect, useState } from "react";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import Heading from "../components/Heading/Heading";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import PageTitle from "../components/PageTitle/PageTitle";
import Steps from "../components/Steps/Steps";
import { APITypes, Dates } from "../components/types";
import createGetParameters from "../functions/createGetParameters";

const findRoom = (rooms: APITypes.Room[], roomId: number) =>
	rooms.find((room) => room.id === roomId);

const Boka = () => {
	const router = useRouter();

	const [rooms, setRooms] = useState<APITypes.Room[]>(undefined);
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
					`http://localhost:8080/api/bunks/available?${createGetParameters(
						{
							start_date,
							end_date,
						}
					)}`
				);
				const { bunks } = resp.data;

				const rooms: APITypes.Room[] = [];
				for (const bunk of bunks) {
					if (!findRoom(rooms, bunk.room_id)) {
						rooms.push(dissoc("bunks", bunk.room));
					}
					const room = findRoom(rooms, bunk.room_id);
					if (!room.bunks) room.bunks = [];
					room.bunks.push(dissocPath(["room", "bunks"], bunk));
				}

				setDates({
					arrival: start_date as string,
					departure: end_date as string,
				});
				setRooms(rooms as APITypes.Room[]);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		asyncFunction();
	}, [router.query]);

	return (
		<div>
			<PageTitle>Boka</PageTitle>
			<HorizontalRule />
			{!isLoading ? (
				<>
					<DateRangeHeader
						arrival={dates.arrival}
						departure={dates.departure}
					/>
					<HorizontalRule />
					{rooms.length > 0 ? (
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
		</div>
	);
};

export default Boka;
