import express from "express";
import {
 generateAnalysisController
} from "../controllers/healthReportController.js";

const router = express.Router();

router.post("/generate-analysis", generateAnalysisController); // AI-generated plan
          // delete a plan

export default router;
