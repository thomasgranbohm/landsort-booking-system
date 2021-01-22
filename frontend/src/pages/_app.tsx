import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header/Header";
import HorizontalRule from "../components/HorizontalRule/HorizontalRule";
import { ModalProvider } from "../components/Modal/Modal";
import PageTitle from "../components/PageTitle/PageTitle";
import "../styles/global.scss";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<PageTitle />
			<Header />
			<HorizontalRule />
			<ModalProvider>
				<Component {...pageProps} />
			</ModalProvider>
		</>
	);
}

export default CustomApp;
