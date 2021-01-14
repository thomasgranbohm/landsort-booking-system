import DateForm from "../src/components/DateForm/DateForm";

const Home = () => {
	return (
		<div>
			<DateForm
				formTitle={"Sök lediga sovplatser"}
				buttonText={"Boka sängplats"}
				onSubmit={(e) => {
					console.log(e);
				}}
			/>
			<hr />
			<DateForm
				formTitle={"Visa bokningar"}
				buttonText={"Visa bokingsläget"}
				onSubmit={(e) => {
					console.log(e);
				}}
			/>
		</div>
	);
};

export default Home;
