import {
	getGithubOAuthUrl,
	handleOAuthCallback,
} from "../helpers/githubOAuth.js";
import Integration from "../models/Integration.js";
import axios from "axios";
import "dotenv/config";

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

export const connectToGitHub = (req, res) => {
	const oauthUrl = getGithubOAuthUrl();
	console.log(oauthUrl, "oauthUrl");
	res.redirect(oauthUrl);
};

export const githubOAuthCallback = async (req, res) => {
	try {
		const { code } = req.query;
		console.log(code, "code");
		if (code) {
			const userData = await handleOAuthCallback(code);
			const newIntegration = new Integration({
				userId: userData.id,
				username: userData.login,
				token: userData.accessToken,
				dateConnected: new Date(),
			});
			await newIntegration.save();
			res.redirect(`http://localhost:4200?success=true&id=${userData.id}`);
		} else {
			res.redirect(`http://localhost:4200?success=false`);
		}
	} catch (err) {
		res.status(500).json({ success: false, error: "GitHub OAuth failed" });
	}
};
export const removeIntegration = async (req, res) => {
	try {
		const { userId } = req.params;
		const integration = await Integration.findOne({ userId });
		console.log(integration, "integration");
		if (!integration) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}
		try {
			const revokeResponse = await revokeGitHubToken(integration.token);
			if (revokeResponse) {
				await Integration.deleteOne({ userId });
				res.status(200).json({
					success: true,
					message: "Integration removed successfully and GitHub token revoked",
				});
			}
		} catch (err) {
			await Integration.deleteOne({ userId });
			res.status(200).json({
				success: true,
				message: "Integration removed successfully and GitHub token revoked",
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: "Failed to remove integration",
		});
	}
};

const revokeGitHubToken = async (token) => {
	try {
		const response = await axios.post(
			`https://api.github.com/applications/${client_id}/token`,
			{
				access_token: token,
			},
			{
				auth: {
					username: client_id,
					password: client_secret,
				},
				headers: { Accept: "application/vnd.github.v3+json" },
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error revoking GitHub token:",
			error.response?.data || error.message
		);
		throw new Error("Failed to revoke GitHub token");
	}
};

export const getUserData = async (req, res) => {
	try {
		const { userId } = req.params;
		const integration = await Integration.findOne({ userId });
		if (integration) {
			return res.status(200).json({ success: true, data: integration });
		}
		res.status(400).json({ success: false, data: null });
	} catch (err) {
		res.status(500).json({ success: false, error: "Failed to get data" });
	}
};

export const checkIntegrationStatus = async (req, res) => {
	try {
		const { userId } = req.params;
		const integration = await Integration.findOne({ userId });
		if (integration) {
			return res.status(200).json({ isConnected: true });
		}
		res.status(200).json({ isConnected: false });
	} catch (err) {
		res.status(500).json({
			isConnected: false,
			error: "Failed to check integration status",
		});
	}
};
