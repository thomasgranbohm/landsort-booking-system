import getClassFunction from "../../functions/getClasses";
import Booking from "../Booking/Booking";
import { APITypes } from "../../types";
import styles from "./BookingContainer.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	bookings: APITypes.Booking[];
};

const Bookings = ({ bookings }: Props) => {
	return (
		<div className={getClass("bookings")}>
			{bookings
				.sort((a, b) =>
					new Date(a.start_date) >= new Date(b.start_date) ? 1 : -1
				)
				.map((booking) => (
					<Booking key={booking.id} booking={booking} />
				))}
		</div>
	);
};

export default Bookings;
