import queryString from "query-string";
import axios from "axios";
import "dotenv/config";

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const gitApiBaseUrl = "https://api.github.com";
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

		const userResponse = await axios.get(`${gitApiBaseUrl}/user`, {
			headers: { Authorization: `token ${accessToken}` },
		});

		return { ...userResponse.data, accessToken };
	} catch (error) {
		console.error("Error during OAuth Callback:", error.message || error);
		throw new Error("OAuth Callback failed.");
	}
};

export const getAllRepos = async (accessToken) => {
	try {
		const response = await axios.get(`${gitApiBaseUrl}/user/repos`, {
			headers: {
				Authorization: `token ${accessToken}`
			}
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch user repos');
	}
};

export const getUserOrganizations = async (accessToken) => {
	try {
		const response = await axios.get(`${gitApiBaseUrl}/user/orgs`, {
			headers: {
				Authorization: `token ${accessToken}`
			}
		});
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch user organizations');
	}
};

export const getOrganizationRepos = async (accessToken, orgName) => {
	try {
		const response = await axios.get(`${gitApiBaseUrl}/orgs/${orgName}/repos`, {
			headers: {
				Authorization: `token ${accessToken}`
			}
		});
		return response.data;
	} catch (error) {
		throw new Error(`Failed to fetch repositories for organization: ${orgName}`);
	}
};


export const getUserCommit = async (userObj) => {
	try {
		const { accessToken, repoName, ownerName } = userObj;
		let page = 1;
		let userCommitCounts = {};

		while (true) {
			const response = await axios.get(`${gitApiBaseUrl}/repos/${ownerName}/${repoName}/commits`, {
				headers: { Authorization: `token ${accessToken}` },
				params: { per_page: 100, page },
			});

			const commits = response.data;

			if (commits.length === 0) break;
			for (const commit of commits) {
				const author = commit.author ? commit.author.login : 'Unknown';
				const authorId = commit.author ? commit.author.id : null;
				if (userCommitCounts[author]) {
					userCommitCounts[author].count++;
				} else {
					userCommitCounts[author] = { count: 1, id: authorId };
				}
			}
			page++;
		}
		const result = Object.keys(userCommitCounts).map(user => ({
			name: user,
			id: userCommitCounts[user].id,
			commit: userCommitCounts[user].count,
		}));
		return result;
	} catch (error) {
		throw new Error('Failed to fetch user commits');
	}
};

export const getUserPullRequests = async (userObj) => {
	try {
		const { accessToken, repoName, ownerName } = userObj;
		let page = 1;
		let userPullRequestCounts = {};

		while (true) {
			const response = await axios.get(`${gitApiBaseUrl}/repos/${ownerName}/${repoName}/pulls`, {
				headers: { Authorization: `token ${accessToken}` },
				params: { per_page: 100, page, state: 'all' },
			});

			const pullRequests = response.data;

			if (pullRequests.length === 0) break;
			for (const pullRequest of pullRequests) {
				const author = pullRequest.user ? pullRequest.user.login : 'Unknown';
				const authorId = pullRequest.user ? pullRequest.user.id : null;
				if (userPullRequestCounts[author]) {
					userPullRequestCounts[author].count++;
				} else {
					userPullRequestCounts[author] = { count: 1, id: authorId };
				}
			}
			page++;
		}

		const result = Object.keys(userPullRequestCounts).map(user => ({
			name: user,
			id: userPullRequestCounts[user].id,
			pullRequests: userPullRequestCounts[user].count,
		}));

		return result;
	} catch (error) {
		throw new Error('Failed to fetch user pull requests');
	}
};

export const getUserIssueCounts = async (userObj) => {
	try {
		const { accessToken, repoName, ownerName } = userObj;
		let page = 1;
		let userIssueCounts = {};

		while (true) {
			const response = await axios.get(`${gitApiBaseUrl}/repos/${ownerName}/${repoName}/issues`, {
				headers: { Authorization: `token ${accessToken}` },
				params: { per_page: 100, page, state: 'all' },
			});

			const issues = response.data;

			if (issues.length === 0) break;
			for (const issue of issues) {
				if (issue.pull_request) continue;

				const author = issue.user ? issue.user.login : 'Unknown';
				const authorId = issue.user ? issue.user.id : null; // Get author ID
				if (userIssueCounts[author]) {
					userIssueCounts[author].count++;
				} else {
					userIssueCounts[author] = { count: 1, id: authorId }; // Store ID
				}
			}
			page++;
		}

		const result = Object.keys(userIssueCounts).map(user => ({
			name: user,
			id: userIssueCounts[user].id,
			issues: userIssueCounts[user].count,
		}));

		return result;
	} catch (error) {
		throw new Error('Failed to fetch user issues');
	}
};