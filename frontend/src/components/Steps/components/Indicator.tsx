import getClassFunction from "../../../functions/getClasses";
import styles from "../Steps.module.scss";
const getClass = getClassFunction(styles);

type Props = {
	step: number;
};

const Indicator = ({ step }: Props) => (
	<div
		style={{ width: (step / 3) * 100 + "%" }}
		className={getClass("indicator")}
	>
		Steg: {step}
	</div>
);

export default Indicator;
