import React from "react";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./Form.module.scss";

type Props = {
	method: "POST" | "GET";
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	title: string;
	buttonText: string;
};

const Form: React.FC<Props> = ({
	buttonText,
	onSubmit,
	method,
	title,
	children,
}) => {
	return (
		<form className={styles["form"]} method={method} onSubmit={onSubmit}>
			<Heading type="h2">{title}</Heading>
			{children}
			<Button customType={"continue"}>{buttonText}</Button>
		</form>
	);
};

export default Form;
