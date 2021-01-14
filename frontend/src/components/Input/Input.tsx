import React, { forwardRef, RefObject } from "react";
import getClassFunction from "../../functions/getClasses";
import joinClasses from "../../functions/joinClasses";
import { AnyProps } from "../types";
import styles from "./Input.module.scss";

const getClass = getClassFunction(styles);

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
			className={joinClasses(
				[getClass("input"), true],
				[className, className]
			)}
			ref={ref}
			type={type}
			name={name}
			{...rest}
		/>
	);
};

export default forwardRef(Input);
