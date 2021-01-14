type Classes = {
	readonly [key: string]: string;
};

const getClassFunction = (classes: Classes) => (names: string | undefined) =>
	(names || "")
		.split(" ")
		.filter((c) => !!classes[c])
		.map((name) => classes[name])
		.join(" ");

export default getClassFunction;
