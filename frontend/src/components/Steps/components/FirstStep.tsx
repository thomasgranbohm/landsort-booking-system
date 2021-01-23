import { Dispatch, FormEvent, SetStateAction } from "react";
import Form from "../../Form/Form";
import RoomContainer from "../../RoomContainer/RoomContainer";
import { APITypes } from "../../../types";

type Props = {
	rooms: APITypes.Room[];
	setSelectedBunks: Dispatch<SetStateAction<APITypes.Bunk[]>>;
	nextStep: (data?: any) => void;
};

const FirstStep = ({ rooms, setSelectedBunks, nextStep }: Props) => (
	<Form
		buttonText="Fortsätt"
		title="Lediga sängar"
		onSubmit={(e: FormEvent<HTMLFormElement>) => {
			const formData = new FormData(e.target as HTMLFormElement);

			const localSelectedBunks: APITypes.Bunk[] = [];

			for (const key of formData.keys()) {
				const bunkId = key.split("-").map(Number).pop();
				const bunk = rooms
					.map((room) => room.bunks)
					.flat()
					.find((bunk: APITypes.Bunk) => bunk.id === bunkId);
				localSelectedBunks.push(bunk);
			}
			if (localSelectedBunks.length === 0) return;

			setSelectedBunks(localSelectedBunks);
			nextStep();
		}}
	>
		<RoomContainer rooms={rooms} />
	</Form>
);

export default FirstStep;
