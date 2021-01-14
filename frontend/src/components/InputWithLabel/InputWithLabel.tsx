import React from "react";
import styles from "./InputWithLabel.module.scss";

type Props = {
	forInput: string;
	label: string;
};

const InputWithLabel: React.FC<Props> = ({ label, forInput, children }) => {
	return (
		<div className={styles["container"]}>
			<label className={styles["label"]} htmlFor={forInput}>
				{label.indexOf(":") !== -1 ? label : `${label}:`}
			</label>
			{children}
		</div>
	);
};

export default InputWithLabel;
