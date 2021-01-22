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
					responseType: "json",
				},
				config
			) as AxiosRequestConfig
		);
		return resp.data;
	} catch (err) {
		if (err.response) {
			try {
				return JSON.parse(err.response.data);
			} catch (_) {
				return err.response.data;
			}
		}
		throw err;
	}
};

export default makeAPIRequest;
