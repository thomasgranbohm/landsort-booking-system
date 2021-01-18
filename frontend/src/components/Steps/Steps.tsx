import { useState } from "react";
import getClassFunction from "../../functions/getClasses";
import { APITypes, Dates } from "../types";
import FirstStep from "./components/FirstStep";
import Indicator from "./components/Indicator";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import styles from "./Steps.module.scss";
const getClass = getClassFunction(styles);

type Props = {
	rooms: APITypes.Room[];
	dates: Dates;
};

const findBunk = (rooms: APITypes.Room[], bunkId: number) =>
	rooms.find(
		(room) => room.bunks.find((bunk) => bunk.id === bunkId) !== undefined
	);

const Steps = ({ rooms, dates }: Props) => {
	const [step, setStep] = useState<number>(1);
	const [selectedBunks, setSelectedBunks] = useState<APITypes.Bunk[]>(
		undefined
	);
	const [selectedUsers, setSelectedUsers] = useState();
	const [nextData, setNextData] = useState<any>(undefined);

	return (
		<div>
			<Indicator step={step} />
			{step === 1 && (
				<FirstStep
					rooms={rooms}
					setSelectedBunks={setSelectedBunks}
					nextStep={(data) => {
						setStep(2);
						if (data) setNextData(data);
					}}
				/>
			)}
			{step === 2 && (
				<SecondStep
					{...dates}
					selectedBunks={selectedBunks}
					nextStep={(data) => {
						setStep(3);
						if (data) setNextData(data);
					}}
				/>
			)}
			{step === 3 && <ThirdStep booking={nextData} />}
		</div>
	);
};

export default Steps;
