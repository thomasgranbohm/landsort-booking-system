import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import Heading from "../Heading/Heading";
import { ClassNameProp, Dates, HeadingTypes } from "../types";
import styles from "./DateRangeHeader.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	type?: HeadingTypes;
	noCenter?: boolean;
} & Dates &
	ClassNameProp;

const DateRangeHeader = ({
	departure,
	arrival,
	type,
	noCenter,
	className,
}: Props) => {
	return (
		<div
			className={joinClasses(
				[getClass("container"), true],
				[getClass("noCenter"), noCenter],
				[className, className]
			)}
		>
			<Heading
				type={type || "h3"}
				noMargin
				className={getClass("heading")}
			>
				<p>Ankomstdatum: </p>
				<span>{arrival}</span>
			</Heading>
			<br />
			<Heading
				type={type || "h3"}
				noMargin
				className={getClass("heading")}
			>
				<p>Avresedatum: </p>
				<span>{departure}</span>
			</Heading>
		</div>
	);
};

export default DateRangeHeader;
