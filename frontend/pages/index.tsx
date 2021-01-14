import axios from "axios";
import DateForm from "../src/components/DateForm/DateForm";
import { APITypes } from "../src/components/types";

const Home = () => {
	return (
		<div>
			<DateForm
				formTitle={"Sök lediga sovplatser"}
				buttonText={"Boka sängplats"}
				onSubmit={async (start_date, end_date, e) => {
					console.log(e);

					const resp = await axios.get(
						"http://localhost:8080/api/bunks/available",
						{
							params: {
								start_date: start_date
									.toISOString()
									.substr(0, 10),
								end_date: end_date.toISOString().substr(0, 10),
							},
						}
					);
					const bunks = resp.data as APITypes.Bunk[];
					console.log(bunks);
				}}
			/>
			<hr />
			<DateForm
				formTitle={"Visa bokningar"}
				buttonText={"Visa bokingsläget"}
				onSubmit={async (start_date, end_date, e) => {
					console.log(e);

					const resp = await axios.get(
						"http://localhost:8080/api/bookings",
						{
							params: {
								start_date: start_date
									.toISOString()
									.substr(0, 10),
								end_date: end_date.toISOString().substr(0, 10),
							},
						}
					);
					const bunks = resp.data as APITypes.Booking[];
					console.log(bunks);
				}}
			/>
		</div>
	);
};

export default Home;
