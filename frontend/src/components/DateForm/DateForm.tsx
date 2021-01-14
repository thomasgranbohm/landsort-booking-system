import { FormEvent, useRef, useState } from "react";
import DateRange from "../DateRange/DateRange";
import Form from "../Form/Form";
import InputError from "../InputError/InputError";

type Props = {
	formTitle: string;
	buttonText: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	startLabel?: string;
	endLabel?: string;
};

const DateForm = ({
	buttonText,
	endLabel,
	formTitle,
	startLabel,
	onSubmit,
}: Props) => {
	const startRef = useRef<HTMLInputElement>();
	const endRef = useRef<HTMLInputElement>();
	const [errorText, setErrorText] = useState<string | undefined>(undefined);
	return (
		<Form
			method="POST"
			title={formTitle}
			buttonText={buttonText}
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault();

				const startInput = startRef.current;
				const endInput = endRef.current;

				const isValidDate = (d: any) =>
					d instanceof Date && !!d.getTime();

				const startDate = new Date(startInput.value);
				const endDate = new Date(endInput.value);
				const endDateSmaller = endDate <= startDate;

				if (!isValidDate(startDate) || !isValidDate(endDate)) {
					setErrorText(
						`Du måste fylla i ett ${
							endLabel || "avresedatum"
						} och ett ${startLabel || "ankomstdatum"}.`
					);
				} else if (endDateSmaller) {
					setErrorText(
						`Du har angett ett ${
							endLabel || "avresedatum"
						} tidigare än eller lika med ${
							startLabel || "ankomstdatum"
						}.`
					);
				} else {
					setErrorText(undefined);
					onSubmit(e);
				}
			}}
		>
			<DateRange end={{ ref: endRef }} start={{ ref: startRef }} />
			<InputError text={errorText} />
		</Form>
	);
};

export default DateForm;
