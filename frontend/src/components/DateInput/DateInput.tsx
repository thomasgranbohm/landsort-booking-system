import { forwardRef } from "react";
import Input from "../Input/Input";
import InputError from "../InputError/InputError";
import { AnyProps } from "../types";
import styles from "./DateInput.module.scss";

const DateInput = (props, ref) => {
	return (
		<>
			<Input
				{...props}
				className={styles["dateinput"]}
				type="date"
				ref={ref}
			/>
		</>
	);
};

export default forwardRef(DateInput);
