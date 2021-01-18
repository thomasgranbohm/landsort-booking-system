import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { dissoc, dissocPath } from "ramda";
import { useEffect } from "react";
import DateRangeHeader from "../components/DateRangeHeader/DateRangeHeader";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import PageTitle from "../components/PageTitle/PageTitle";
import Steps from "../components/Steps/Steps";
import { APITypes } from "../components/types";
import createGetParameters from "../functions/createGetParameters";
import makeAPIRequest from "../functions/makeAPIRequest";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { ankomstdatum: start_date, avresedatum: end_date } = query;

	const bunks = await makeAPIRequest(
		`/bunks/available?${createGetParameters({
			start_date,
			end_date,
		})}`
	);

	return {
		props: {
			bunks,
			start_date: start_date || null,
			end_date: end_date || null,
		} as Props,
	};
};

type Props = {
	bunks: APITypes.Bunk[];
	start_date: string | null;
	end_date: string | null;
};

const findRoom = (rooms: APITypes.Room[], roomId: number) =>
	rooms.find((room) => room.id === roomId);

const Boka = (props: Props) => {
	const { bunks, end_date, start_date } = props;
	const rooms: APITypes.Room[] = [];
	for (const bunk of bunks) {
		if (!findRoom(rooms, bunk.room_id)) {
			rooms.push(dissoc("bunks", bunk.room));
		}
		const room = findRoom(rooms, bunk.room_id);
		if (!room.bunks) room.bunks = [];
		room.bunks.push(dissocPath(["room", "bunks"], bunk));
	}

	const router = useRouter();
	useEffect(() => {
		if (bunks.length === 0) router.push("/");
	}, []);

	return (
		<div>
			<PageTitle>Boka</PageTitle>
			<HorizontalRule />
			<DateRangeHeader arrival={start_date} departure={end_date} />
			<HorizontalRule />
			<Steps
				dates={{ arrival: start_date, departure: end_date }}
				rooms={rooms}
			/>
		</div>
	);
};

export default Boka;
