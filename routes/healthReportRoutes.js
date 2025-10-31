import express from "express";
import {
  getReportsByUser,
  getReportById,
  deleteReport,
  getAverageHealthScore,
} from "../controllers/healthReportController.js";
import { authenticateToken } from "../midddlewares/auth.js";

const router = express.Router();

router.get("/user/:userId", authenticateToken, getReportsByUser);
router.get("/:id", authenticateToken, getReportById);
router.delete("/:id", authenticateToken, deleteReport);
router.get("/average-score/:userId", authenticateToken, getAverageHealthScore);

export default router;

