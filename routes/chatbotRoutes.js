import express from "express";
import { chatWithAI } from "../controllers/chatbotController.js";
import { authenticateToken } from "../midddlewares/auth.js";

const router = express.Router();

router.post("/chat", authenticateToken, chatWithAI);

export default router;

