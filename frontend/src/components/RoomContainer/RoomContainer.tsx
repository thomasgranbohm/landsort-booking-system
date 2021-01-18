import getClassFunction from "../../functions/getClasses";
import Room from "../Room/Room";
import { APITypes } from "../types";
import styles from "./RoomContainer.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	rooms: APITypes.Room[];
};

const RoomContainer = ({ rooms }: Props) => {
	return (
		<div className={getClass("rooms")}>
			{rooms.map((room) => (
				<Room key={room.id} {...room} />
			))}
		</div>
	);
};

export default RoomContainer;
