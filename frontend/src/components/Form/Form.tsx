import React from "react";
import getClassFunction from "../../functions/getClasses";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./Form.module.scss";

const getClass = getClassFunction(styles);

type Props = {
	method?: "POST" | "GET";
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
	const formId = "form-" + title.split(" ").join("-");
	return (
		<>
			<Heading type="h2">{title}</Heading>
			<form
				id={formId}
				className={getClass("form")}
				method={method}
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
					if (method === undefined) e.preventDefault();
					onSubmit(e);
				}}
			>
				{children}
			</form>
			<Button form={formId} customType={"continue"}>
				{buttonText}
			</Button>
		</>
	);
};

export default Form;
