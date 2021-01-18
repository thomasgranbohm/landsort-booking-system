import Booking from "../../Booking/Booking";
import Heading from "../../Heading/Heading";
import { APITypes } from "../../types";

type Props = {
	booking: APITypes.Booking;
};

const ThirdStep = ({ booking }: Props) => {
	console.log(booking);
	return (
		<div>
			<Heading type="h2">
				{booking.bunks.length > 1
					? "Dina platser är nu bokade!"
					: "Din plats är nu bokad!"}
			</Heading>
			<Booking booking={booking} />
		</div>
	);
};

export default ThirdStep;
