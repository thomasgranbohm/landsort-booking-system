import React, { forwardRef, RefObject } from "react";
import { AnyProps } from "../types";
import styles from "./Input.module.scss";

type Props = {
	name: string;
	type?: "date" | "text" | "email";
} & AnyProps;

const Input = (
	{ type = "text", className, name, ...rest }: Props,
	ref: RefObject<HTMLInputElement>
) => {
	return (
		<input
			className={[styles["input"], className || ""].join(" ")}
			ref={ref}
			type={type}
			name={name}
			{...rest}
		/>
	);
};

export default forwardRef(Input);
