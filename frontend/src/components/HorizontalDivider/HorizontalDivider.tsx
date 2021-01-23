import { Children } from "react";
import joinClasses from "../../functions/joinClasses";
import HorizontalRule from "../HorizontalRule/HorizontalRule";
import { ClassNameProp } from "../../types";

type Props = ClassNameProp;

const HorizontalDivider: React.FC<Props> = ({ className, children }) => {
	const childArray = Children.toArray(children);
	return (
		<div className={joinClasses([className, className])}>
			{childArray.map((child, i) => {
				if (i !== childArray.length - 1) {
					return (
						<>
							{child}
							<HorizontalRule key={"horizontal-rule-" + i} />
						</>
					);
				} else {
					return child;
				}
			})}
		</div>
	);
};

export default HorizontalDivider;
