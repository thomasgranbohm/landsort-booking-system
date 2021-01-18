import getClassFunction from "../../functions/getClasses";
import Heading from "../Heading/Heading";
import HorizontalRule from "../HorizontalRule/HorizontalRule";
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

	const BookedSpaces = () => (
		<div className={getClass("bookedspaces")}>
			{bunks.map(
				(
					{
						location: bunkLocation,
						room: { location: roomLocation },
					},
					index
				) => (
					<>
						<div className={getClass("bookedspace")} key={index}>
							<p className={getClass("room")}>
								<b>Rum: </b>
								{roomLocation}
							</p>
							<p className={getClass("bunk")}>
								<b>Plats: </b>
								{bunkLocation}
							</p>
							<p className={getClass("arrival date")}>
								<b>Ankomstdatum: </b>
								{start_date}
							</p>
							<p className={getClass("departure date")}>
								<b>Avresedatum: </b>
								{end_date}
							</p>
						</div>
						{bunks.length !== index + 1 && <HorizontalRule />}
					</>
				)
			)}
		</div>
	);

	return (
		<div className={getClass("booking")}>
			<Heading type="h4" className={getClass("name")}>
				{firstname} {lastname}
			</Heading>
			<BookedSpaces />
		</div>
	);
};

export default Booking;
