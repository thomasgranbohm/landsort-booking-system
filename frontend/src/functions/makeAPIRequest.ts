import axios, { AxiosRequestConfig } from "axios";
import { mergeRight } from "ramda";

const makeAPIRequest = async (
	endpoint: string,
	config: AxiosRequestConfig = {}
) => {
	try {
		const resp = await axios(
			`http://${process.env.API_URL}${
				endpoint.startsWith("/") ? endpoint : "/".concat(endpoint)
			}`,
			mergeRight(
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
				config
			)
		);
		return resp.data;
	} catch (err) {
		if (err.response) {
			return err.response.data;
		}
	}
};

export default makeAPIRequest;
