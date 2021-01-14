import { RefObject } from "react";
import DateInput from "../DateInput/DateInput";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

type Props = {
	start: {
		ref: RefObject<HTMLInputElement>;
		label?: string;
	};
	end: {
		ref: RefObject<HTMLInputElement>;
		label?: string;
	};
};

const DateRange = ({ end, start }: Props) => {
	return (
		<>
			<InputWithLabel
				label={start.label || "Ankomstdatum"}
				forInput="startdate"
			>
				<DateInput {...start} name="startdate" />
			</InputWithLabel>
			<InputWithLabel
				label={end.label || "Avresedatum"}
				forInput="enddate"
			>
				<DateInput {...end} name="enddate" />
			</InputWithLabel>
		</>
	);
};

export default DateRange;
