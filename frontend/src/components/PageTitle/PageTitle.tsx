import Head from "next/head";

type Props = {
	title?: string;
};

const PageTitle: React.FC<Props> = ({ title, children }) => (
	<Head>
		<title>{`${
			((title || children) && (title || children) + " - ") || ""
		}Landsort Fågelstation`}</title>
	</Head>
);

export default PageTitle;
