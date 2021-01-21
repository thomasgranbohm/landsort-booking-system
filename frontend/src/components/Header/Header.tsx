import Link from "next/link";
import getClassFunction from "../../functions/getClasses";
import Heading from "../Heading/Heading";
import styles from "./Header.module.scss";

const getClass = getClassFunction(styles);

const Header = () => {
	return (
		<header className={getClass("header")}>
			<Link href={`http://${process.env.APP_URL}`}>
				<img
					title="Landsorts Fågelstation "
					className={getClass("logo")}
					src="/images/logo-bara-fagel.png"
					alt="Logo"
				/>
			</Link>
			<Heading type="h1">
				Landsorts
				<br />
				<span style={{ color: "#ca652e" }}>Fågelstation</span>
			</Heading>
		</header>
	);
};

export default Header;
