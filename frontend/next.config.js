const { NODE_ENV, API_URL, APP_URL } = process.env;

module.exports = {
	env: {
		APP_URL,
		API_URL,
	},
	trailingSlash: true,
};
