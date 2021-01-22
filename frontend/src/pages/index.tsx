import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import DateForm from "../components/DateForm/DateForm";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";

const Home = () => {
	const router = useRouter();

	const onSubmit = (start_date: Date, end_date: Date, link) => {
		router.push({
			pathname: link,
			query: {
				ankomstdatum: start_date.toISOString().substr(0, 10),
				avresedatum: end_date.toISOString().substr(0, 10),
			},
		});
	};

	return (
		<main>
			<DateForm
				buttonText={"Sök lediga sovplatser"}
				formTitle={"Boka sängplats"}
				onSubmit={(s, e) => onSubmit(s, e, "/boka")}
			/>
			<HorizontalRule />
			<DateForm
				buttonText={"Visa bokningar"}
				formTitle={"Visa bokningsläget"}
				onSubmit={(s, e) => onSubmit(s, e, "/bokningslaget")}
			/>
		</main>
	);
};

export default Home;
