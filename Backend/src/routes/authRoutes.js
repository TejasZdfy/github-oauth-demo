import { Router } from "express";
import {
	checkIntegrationStatus,
	connectToGitHub,
	getAllUserRepos,
	getOrganizationAllRepos,
	getUserAllOrganizations,
	getUserData,
	getUserWiseRepoData,
	githubOAuthCallback,
	removeIntegration,
} from "../controllers/authController.js";

const router = Router();

router.get("/github", connectToGitHub);
router.get("/github/callback", githubOAuthCallback);
router.get("/get-user-data/:userId", getUserData);
router.get("/status/:userId", checkIntegrationStatus);
router.get("/get-all-organizations/:userId", getUserAllOrganizations);
router.get("/get-organization-all-repos/:userId/:organizationName", getOrganizationAllRepos);
router.get("/get-all-repos/:userId", getAllUserRepos);
router.post("/get-user-wise-repo-data", getUserWiseRepoData);
router.delete("/remove/:userId", removeIntegration);

export default router;
