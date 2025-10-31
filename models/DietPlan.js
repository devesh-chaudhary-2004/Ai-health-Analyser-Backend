import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
  breakfast: String,
  midMorningSnack: String,
  lunch: String,
  eveningSnack: String,
  dinner: String,
  hydration: String, // e.g. "Drink 8–10 glasses of water"
});

const exerciseSchema = new mongoose.Schema({
  activities: [String], // e.g. ["Walking 30 minutes daily", "Swimming"]
});

const medicineSchema = new mongoose.Schema({
  name: String, // e.g. "Omega-3 supplements"
  note: String, // e.g. "Consult doctor for personalized recommendations"
});

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  date: Date,
  dietPlan: dietSchema,
  exercises: [{ type: String, default: [] }],
  medicines: [medicineSchema],
  progress: { type: Number, default: 0 }, // e.g. 0 to 100
  focusNote: String, // e.g. "Focus on maintaining a balanced diet"
});

const weeklyPlannerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  days: [daySchema],
}, { timestamps: true });

const WeeklyPlanner = mongoose.model("WeeklyPlanner", weeklyPlannerSchema);
export default WeeklyPlanner;
