import { dissoc, dissocPath } from "ramda";
import { APITypes } from "../types";

const findRoom = (rooms: APITypes.Room[], location: string) =>
	rooms.find((room) => room.location === location);

const mapToRooms = (
	bunks: APITypes.Bunk | APITypes.Bunk[]
): APITypes.Room[] => {
	const rooms: APITypes.Room[] = [];
	const pushToRoom = (bunk: APITypes.Bunk) => {
		if (!findRoom(rooms, bunk.room.location)) {
			rooms.push(dissoc("bunks", bunk.room));
		}
		const room = findRoom(rooms, bunk.room.location);
		if (!room.bunks) room.bunks = [];
		room.bunks.push(dissocPath(["room", "bunks"], bunk));
	};
	if (bunks instanceof Array) {
		bunks.forEach(pushToRoom);
	} else {
		pushToRoom(bunks);
	}
	return rooms;
};

export default mapToRooms;
