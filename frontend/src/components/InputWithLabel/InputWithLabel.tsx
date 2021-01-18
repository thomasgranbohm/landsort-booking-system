import React from "react";
import getClassFunction from "../../functions/getClasses";
import styles from "./InputWithLabel.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	forInput: string;
	label: string;
	bold?: boolean;
};

const InputWithLabel: React.FC<Props> = ({
	label,
	forInput,
	children,
	bold,
}) => {
	const newLabel = label.indexOf(":") !== -1 ? label : `${label}:`;
	return (
		<div className={getClass("container")}>
			<label className={getClass("label")} htmlFor={forInput}>
				{bold ? <b>{newLabel}</b> : newLabel}
			</label>
			{children}
		</div>
	);
};

export default InputWithLabel;
