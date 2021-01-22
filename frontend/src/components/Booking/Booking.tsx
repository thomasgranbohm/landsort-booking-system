import getClassFunction from "../../functions/getClasses";
import mapToRooms from "../../functions/mapToRooms";
import DateRangeHeader from "../DateRangeHeader/DateRangeHeader";
import Heading from "../Heading/Heading";
import HorizontalDivider from "../HorizontalDivider/HorizontalDivider";
import { APITypes } from "../types";
import styles from "./Booking.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	booking: APITypes.Booking;
};

const Booking = ({ booking }: Props) => {
	const {
		start_date,
		end_date,
		bunks,
		user: { firstname, lastname },
	} = booking;

	const rooms = mapToRooms(bunks);

	const BookedSpaces = () => (
		<HorizontalDivider>
			{rooms.map(({ location: roomLocation, bunks }) => (
				<div className={getClass("row")}>
					<p className={getClass("room")}>
						<b>Rum: </b>
						{roomLocation}
					</p>
					<p className={getClass("bunk")}>
						<b>Plats: </b>
						{bunks.map(({ location }) => location).join(", ")}
					</p>
				</div>
			))}
		</HorizontalDivider>
	);

	return (
		<div className={getClass("booking")}>
			<Heading type="h3" noMargin className={getClass("name")}>
				{firstname} {lastname}
			</Heading>
			<DateRangeHeader
				noCenter
				type="b"
				arrival={start_date}
				departure={end_date}
			/>
			<BookedSpaces />
		</div>
	);
};

export default Booking;
