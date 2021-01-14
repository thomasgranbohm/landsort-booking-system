import Heading from "../Heading/Heading";
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<img
				className={styles["logo"]}
				src="/images/logo-bara-fagel.png"
				alt="Logo"
			/>
			<Heading type="h1">Landsort Fågelstation</Heading>
		</header>
	);
};

export default Header;
