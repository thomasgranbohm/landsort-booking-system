import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Booking from "../components/Booking/Booking";
import Button from "../components/Button/Button";
import Heading from "../components/Heading/Heading";
import { APITypes } from "../components/types";
import makeAPIRequest from "../functions/makeAPIRequest";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { avboknings_id: cancellation_token } = query;

	const { booking } = await makeAPIRequest(
		`/bookings/cancel/${cancellation_token}?noCancel`
	);

	return {
		props: {
			booking: (booking as APITypes.Booking) || null,
			cancellation_token,
		} as Props,
	};
};

type Props = {
	booking: APITypes.Booking;
	cancellation_token: string;
};

const Avboka = ({ cancellation_token, booking }: Props) => {
	const router = useRouter();
	useEffect(() => {
		if (!booking) router.push("/");
	}, []);
	return (
		<div>
			<Heading type="h2">Vill du boka av bokningen:</Heading>
			{booking && (
				<>
					<Booking booking={booking} />
					<Button
						onClick={async () => {
							const resp = await fetch(
								`localhost:8080/api/bookings/cancel/${cancellation_token}`
							);
							const json = await resp.json();
							if (json.errors) {
								alert(
									"An error occurred." + JSON.stringify(json)
								);
								console.error(json.errors);
							} else {
								router.push("/");
							}
						}}
					>
						Boka av.
					</Button>
				</>
			)}
		</div>
	);
};

export default Avboka;
