import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
	render() {
		return (
			<Html lang="sv">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
