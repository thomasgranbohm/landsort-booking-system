import getClassFunction from "../../functions/getClasses";
import styles from "./GridGap.module.scss";
const getClass = getClassFunction(styles);

const GridGap: React.FC = ({ children }) => {
	return <div className={getClass("container")}>{children}</div>;
};

export default GridGap;
