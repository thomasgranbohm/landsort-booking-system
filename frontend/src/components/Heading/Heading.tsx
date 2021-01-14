import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import { ClassNameProp } from "../types";
import styles from "./Heading.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	title?: string;
	type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "b";
} & ClassNameProp;

const Heading: React.FC<Props> = ({
	type = "b",
	title,
	children,
	className,
}) => {
	const HeadingElement = type;
	return (
		<HeadingElement
			className={joinClasses(
				[getClass("heading"), true],
				[className, className]
			)}
		>
			{title || children}
		</HeadingElement>
	);
};

export default Heading;
