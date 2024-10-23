import { Router } from "express";
import {
	checkIntegrationStatus,
	connectToGitHub,
	getUserData,
	githubOAuthCallback,
	removeIntegration,
} from "../controllers/authController.js";

const router = Router();

router.get("/github", connectToGitHub);
router.get("/github/callback", githubOAuthCallback);
router.get("/get-user-data/:userId", getUserData);
router.get("/status/:userId", checkIntegrationStatus);
router.delete("/remove/:userId", removeIntegration);

export default router;
