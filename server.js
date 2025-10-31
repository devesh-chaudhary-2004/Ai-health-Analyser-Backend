import  express from "express";
import  dotenv from  "dotenv";
import  cors from "cors";
import { connectDB } from "./config/db.js";

import weeklyPlannerRoutes from "./routes/weeklyPlannerRoutes.js";
import healthReportRoutes from "./routes/healthReportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import "./services/reminderScheduler.js"; // Initialize cron jobs
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5173"
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", healthReportRoutes);
app.use("/api/weekly-planner", weeklyPlannerRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/reminders", reminderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Health Report API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
