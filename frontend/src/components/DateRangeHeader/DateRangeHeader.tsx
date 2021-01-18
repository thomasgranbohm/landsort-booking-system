import getClassFunction from "../../functions/getClasses";
import Heading from "../Heading/Heading";
import { Dates, HeadingTypes } from "../types";
import styles from "./DateRangeHeader.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	type?: HeadingTypes;
} & Dates;

const DateRangeHeader = ({ departure, arrival, type }: Props) => {
	return (
		<Heading type={type || "h3"} className={getClass("heading")}>
			Ankomstdatum: {arrival}
			<br />
			Avresedatum: {departure}
		</Heading>
	);
};

export default DateRangeHeader;
