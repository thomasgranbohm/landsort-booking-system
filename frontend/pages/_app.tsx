import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../src/components/Header/Header";
import "../src/styles/global.scss";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>Boka - Landort Fågelstation</title>
			</Head>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default CustomApp;
