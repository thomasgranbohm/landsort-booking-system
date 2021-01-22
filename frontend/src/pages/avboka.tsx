import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import Booking from "../components/Booking/Booking";
import Button from "../components/Button/Button";
import Heading from "../components/Heading/Heading";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { ModalContext, ModalTypes } from "../components/Modal/Modal";
import { APITypes } from "../components/types";
import makeAPIRequest from "../functions/makeAPIRequest";
import parseError from "../functions/parseError";

const Avboka = () => {
	const router = useRouter();
	const { handleModal } = useContext<ModalTypes>(ModalContext);

	const [booking, setBooking] = useState<APITypes.Booking>(undefined);
	const [cancellationId, setCancellationid] = useState<string>(undefined);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	useEffect(() => {
		const asyncFunction = async () => {
			const { avbokningsid: cancellation_token } = router.query;

			if (!cancellation_token) return;

			setIsLoading(true);

			const { errors, booking } = await makeAPIRequest(
				`/bookings/cancel/${cancellation_token}?noCancel`
			);

			if (errors) {
				handleModal({
					error: true,
					data: parseError(JSON.parse(errors)),
				});
			} else {
				setBooking(booking);
				setCancellationid(cancellation_token as string);
			}

			setIsLoading(false);
		};
		asyncFunction();
	}, [router.query]);

	return (
		<main>
			{!isLoading && booking ? (
				<>
					<Heading type="h2">Vill du boka av bokningen:</Heading>
					<Booking booking={booking} />
					<Button
						onClick={async () => {
							const resp = await fetch(
								`http://${process.env.API_URL}/api/bookings/cancel/${cancellationId}`
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
			) : (
				<LoadingSpinner />
			)}
		</main>
	);
};

export default Avboka;
