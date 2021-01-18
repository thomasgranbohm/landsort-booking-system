import { useRouter } from "next/dist/client/router";
import Booking from "../../Booking/Booking";
import Button from "../../Button/Button";
import Heading from "../../Heading/Heading";
import { APITypes } from "../../types";

type Props = {
	booking: APITypes.Booking;
};

const ThirdStep = ({ booking }: Props) => {
	const router = useRouter();
	return (
		<div>
			<Heading type="h2">
				{booking.bunks.length > 1
					? "Dina platser är nu bokade!"
					: "Din plats är nu bokad!"}
			</Heading>
			<Booking booking={booking} />
			<Button onClick={() => router.push("/")}>
				Tillbaka till start.
			</Button>
		</div>
	);
};

export default ThirdStep;
