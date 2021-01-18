import { FC, useEffect, useState } from "react";
import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import styles from "./InputError.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	text?: string;
};

const InputError: FC<Props> = ({ text, children }) => {
	const [shown, setShown] = useState<boolean>(false);
	useEffect(() => {
		setShown(!!text && text.length !== 0);
	}, [text]);
	return (
		<p
			className={joinClasses(
				[getClass("error"), true],
				[getClass("shown"), shown]
			)}
		>
			<b>Felmeddelande:</b> {text || children || "Unknown error."}
		</p>
	);
};

export default InputError;
