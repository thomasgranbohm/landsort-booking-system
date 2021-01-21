type CustomRequestInit = RequestInit;

const makeAPIRequest = async (
	endpoint: string,
	init: CustomRequestInit = {}
) => {
	const headers = {
		"Content-Type": "application/json",
	};
	const resp = await fetch(
		`http://${process.env.API_URL}${
			endpoint.startsWith("/") ? endpoint : "/".concat(endpoint)
		}`,
		{
			...headers,
			...init,
		}
	);
	const result = await resp.json();

	return result;
};

export default makeAPIRequest;
