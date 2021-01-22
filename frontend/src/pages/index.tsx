import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import DateForm from "../components/DateForm/DateForm";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import { ModalTypes } from "../components/Modal/functions/useModal";
import { ModalContext } from "../components/Modal/Modal";

const Home = () => {
	const router = useRouter();
	const { handleModal } = useContext<ModalTypes>(ModalContext);

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
			<button onClick={() => handleModal("wower")}>
				Show Modal
			</button>
		</main>
	);
};

export default Home;
