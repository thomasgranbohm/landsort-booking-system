import axios from "axios";
import { useRef } from "react";
import Form from "../../Form/Form";
import Heading from "../../Heading/Heading";
import HorizontalRule from "../../HorizontalRule/HorizontalRule";
import Input from "../../Input/Input";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import { APITypes, Dates, UserInputRefs } from "../../types";
import UserInput from "../../UserInput/UserInput";

type Props = {
	selectedBunks: APITypes.Bunk[];
	nextStep: (data?: any) => void;
} & Dates;

type E = {
	bunkId: number;
} & UserInputRefs;

const SecondStep = ({ selectedBunks, nextStep, arrival, departure }: Props) => {
	const memberref = useRef<HTMLInputElement>();

	const refs: E[] = [];

	const UserInputs = () => {
		return (
			<div>
				{selectedBunks.map((bunk) => {
					const ref = {
						firstname: useRef<HTMLDivElement>(),
						lastname: useRef<HTMLDivElement>(),
					} as UserInputRefs;
					refs.push({ ...ref, bunkId: bunk.id });
					return (
						<div className="bunk" key={bunk.id}>
							<Heading noMargin type="h3">
								Rum: {bunk.room?.location}
							</Heading>
							<Heading noMargin>Plats: {bunk.location}</Heading>
							<UserInput {...ref} />
							{selectedBunks.indexOf(bunk) !==
								selectedBunks.length - 1 && <HorizontalRule />}
						</div>
					);
				})}
			</div>
		);
	};
	return (
		<Form
			buttonText="Boka"
			title="Personuppgifter"
			onSubmit={async (_) => {
				const resp = await axios(
					`http://${process.env.API_URL}/bookings`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						data: {
							bunks: selectedBunks.map((bunk) => bunk.id),
							user_email: memberref.current.value
								.toLowerCase()
								.trim(),
							start_date: arrival,
							end_date: departure,
						},
					}
				);
				const { errors, booking } = resp.data;
				if (errors) {
					console.error(errors);
				} else {
					nextStep(booking);
				}
			}}
		>
			<UserInputs />
			<HorizontalRule />
			<InputWithLabel
				label="Medlemmens mailaddress"
				forInput="memberemail"
				bold
			>
				<Input
					ref={memberref}
					name="memberemail"
					type="text"
					placeholder="sven.svensson@exampel.se"
				/>
			</InputWithLabel>
		</Form>
	);
};

export default SecondStep;
