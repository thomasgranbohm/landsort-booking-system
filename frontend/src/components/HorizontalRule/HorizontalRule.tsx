import getClassFunction from "../../functions/getClasses";
import styles from "./HorizontalRule.module.scss";

const getClass = getClassFunction(styles);

const HorizontalRule = () => <hr className={getClass("horizontal-rule")} />;

export default HorizontalRule;
