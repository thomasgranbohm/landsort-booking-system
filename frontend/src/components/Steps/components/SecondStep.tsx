import { useContext, useRef } from "react";
import makeAPIRequest from "../../../functions/makeAPIRequest";
import parseError from "../../../functions/parseError";
import Form from "../../Form/Form";
import Heading from "../../Heading/Heading";
import HorizontalRule from "../../HorizontalRule/HorizontalRule";
import Input from "../../Input/Input";
import InputWithLabel from "../../InputWithLabel/InputWithLabel";
import { ModalContext, ModalTypes } from "../../Modal/Modal";
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
	const { handleModal } = useContext<ModalTypes>(ModalContext);

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
				const { errors, booking } = await makeAPIRequest("/bookings", {
					method: "POST",
					data: {
						bunks: selectedBunks.map((bunk) => bunk.id),
						user_email: memberref.current.value
							.toLowerCase()
							.trim(),
						start_date: arrival,
						end_date: departure,
					},
				});
				if (errors) {
					handleModal({
						type: "error",
						data: parseError(JSON.parse(errors)),
					});
				} else {
					nextStep(booking);
				}
			}}
		>
			{/* <UserInputs />
			<HorizontalRule /> */}
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
