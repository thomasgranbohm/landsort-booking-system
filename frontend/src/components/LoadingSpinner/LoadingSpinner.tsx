import getClassFunction from "../../functions/getClasses";
import Heading from "../Heading/Heading";
import styles from "./LoadingSpinner.module.scss";
const getClass = getClassFunction(styles);

const LoadingSpinner = () => {
	return (
		<Heading type="h2" className={getClass("title")}>
			Laddar in...
		</Heading>
	);
};

export default LoadingSpinner;
