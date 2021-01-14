import React from "react";
import getClassFunction from "../../functions/getClasses";
import styles from "./InputWithLabel.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	forInput: string;
	label: string;
};

const InputWithLabel: React.FC<Props> = ({ label, forInput, children }) => {
	return (
		<div className={getClass("container")}>
			<label className={getClass("label")} htmlFor={forInput}>
				{label.indexOf(":") !== -1 ? label : `${label}:`}
			</label>
			{children}
		</div>
	);
};

export default InputWithLabel;
