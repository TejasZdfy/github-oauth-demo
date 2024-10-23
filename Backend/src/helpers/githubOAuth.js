import queryString from "query-string";
import axios from "axios";
import "dotenv/config";

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

export const getGithubOAuthUrl = () => {
	const githubOAuthParams = {
		client_id,
		redirect_uri: "http://localhost:3000/auth/github/callback",
		scope: "user repo",
		allow_signup: true,
	};
	return `https://github.com/login/oauth/authorize?${queryString.stringify(
		githubOAuthParams
	)}`;
};

export const handleOAuthCallback = async (code) => {
	try {
		const tokenResponse = await axios.post(
			"https://github.com/login/oauth/access_token",
			{
				client_id,
				client_secret,
				code,
			},
			{
				headers: { Accept: "application/json" },
			}
		);

		if (tokenResponse.data.error) {
			console.error(`GitHub OAuth Token Error: ${tokenResponse.data.error}`);
			throw new Error(tokenResponse.data.error_description);
		}

		const accessToken = tokenResponse.data.access_token;
		console.log(`Access Token: ${accessToken}`);

		const userResponse = await axios.get("https://api.github.com/user", {
			headers: { Authorization: `token ${accessToken}` },
		});

		return { ...userResponse.data, accessToken };
	} catch (error) {
		console.error("Error during OAuth Callback:", error.message || error);
		throw new Error("OAuth Callback failed.");
	}
};
