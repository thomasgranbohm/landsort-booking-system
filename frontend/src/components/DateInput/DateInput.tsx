import { forwardRef } from "react";
import getClassFunction from "../../functions/getClasses";
import Input from "../Input/Input";
import styles from "./DateInput.module.scss";

const getClass = getClassFunction(styles);

const DateInput = (props, ref) => {
	return (
		<Input
			{...props}
			className={getClass("dateinput")}
			type="date"
			ref={ref}
		/>
	);
};

export default forwardRef(DateInput);
