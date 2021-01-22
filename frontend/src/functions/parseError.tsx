type Errors = {
	[key: string]: string | string[];
};

const capitalize = (str: string) =>
	str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();

const parseError = (errors: Errors) =>
	Object.entries(errors).map(([key, value], i) => (
		<p key={i}>
			<b>{key.split("_").map(capitalize).join(" ")}:</b>{" "}
			{typeof value === "string"
				? value
				: value.map(capitalize).join(" ")}
		</p>
	));

export default parseError;
