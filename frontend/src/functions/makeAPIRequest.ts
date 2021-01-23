import axios, { AxiosRequestConfig } from "axios";
import { mergeRight } from "ramda";
import { ModalState } from "../components/Modal/Modal";
import parseError from "./parseError";

type Config = {
	handleModal?: (state: ModalState) => void;
	modalState?: ModalState;
} & AxiosRequestConfig;

type Returns = {
	handledError?: boolean;
} & any;

const makeAPIRequest = async (
	endpoint: string,
	config?: Config
): Promise<Returns> => {
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
			if (config && config.handleModal) {
				const { handleModal } = config;
				const modalState = config.modalState || {};
				handleModal({
					type: "error",
					data: parseError(err.response.data.errors),
					...modalState,
				});
			}
			return {
				handledError: true,
			};
		}
		throw err;
	}
};

export default makeAPIRequest;
