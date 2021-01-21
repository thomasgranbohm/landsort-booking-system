import getClassFunction from "../../functions/getClasses";
import Heading from "../Heading/Heading";
import { APITypes } from "../types";
import styles from "./Room.module.scss";

const getClass = getClassFunction(styles);

type Props = APITypes.Room;

const Room = ({ id, location, bunks }: Props) => {
	const Bunks = () => {
		const Bunk = (bunk: APITypes.Bunk) => {
			const combinedId = `${id}-${bunk.id}`;
			return (
				<div className={getClass("bunk")}>
					<input type="checkbox" name={combinedId} id={combinedId} />
					<label htmlFor={combinedId}>
						<b>Plats:</b> {bunk.location}
					</label>
				</div>
			);
		};
		return (
			<div>
				{bunks.map((bunk, i) => (
					<Bunk key={i} {...bunk} />
				))}
			</div>
		);
	};

	return (
		<div className={getClass("room")}>
			<Heading noMargin type="h4">
				Rum: {location}
			</Heading>
			<Bunks />
		</div>
	);
};

export default Room;
