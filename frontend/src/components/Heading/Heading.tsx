import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import { ClassNameProp, HeadingTypes } from "../types";
import styles from "./Heading.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	title?: string;
	type?: HeadingTypes;
	noMargin?: boolean;
} & ClassNameProp;

const Heading: React.FC<Props> = ({
	type = "b",
	title,
	children,
	className,
	noMargin,
}) => {
	const HeadingElement = type;
	return (
		<HeadingElement
			className={joinClasses(
				[getClass("heading"), true],
				[getClass("no-margin"), noMargin],
				[className, className]
			)}
		>
			{title || children}
		</HeadingElement>
	);
};

export default Heading;
