import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import { AnyProps, ClassNameProp } from "../../types";
import styles from "./Button.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	value?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	customType?: "continue" | "return" | "none";
	withoutContent?: boolean;
	inline?: boolean;
} & ClassNameProp &
	AnyProps;

const Button: React.FC<Props> = ({
	onClick,
	className,
	children,
	value,
	customType,
	withoutContent,
	inline,
	...props
}) => {
	return (
		<button
			{...props}
			onClick={onClick}
			className={joinClasses(
				[getClass("button"), true],
				[getClass(customType), customType],
				[getClass("withoutContent"), withoutContent],
				[getClass("inline"), inline],
				[className, className]
			)}
		>
			{value || children}
		</button>
	);
};

export default Button;
