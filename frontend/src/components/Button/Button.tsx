import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import { AnyProps, ClassNameProp } from "../types";
import styles from "./Button.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	value?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	customType?: "continue" | "return";
} & ClassNameProp &
	AnyProps;

const Button: React.FC<Props> = ({
	onClick,
	className,
	children,
	value,
	customType,
	...props
}) => {
	return (
		<button
			{...props}
			onClick={onClick}
			className={joinClasses([
				[getClass("button"), true],
				[getClass(customType), customType],
				[className, className],
			])}
		>
			{value || children}
		</button>
	);
};

export default Button;
