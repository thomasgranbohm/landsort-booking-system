type ObjectType = {
	[key: string]: any;
};

const createGetParameters = (obj: ObjectType) =>
	Object.entries(obj)
		.map(
			([key, value]) =>
				`${encodeURI(key)}=${encodeURI(new String(value).toString())}`
		)
		.join("&");

export default createGetParameters;
