import mongoose from "mongoose";

const healthReportSchema = new mongoose.Schema({
  userId: { type: String },
  date: { type: Date, default: Date.now },
  symptoms: [String],
  causes: [String],
  deficiencies: [String],
  prevention: [String],
  cure: [String],
  medicines: [String],
  yoga: [String],
  exercises: [String],
  foodsToEat: [String],
  foodsToAvoid: [String],
  thingsToFollow: [String],
  thingsToAvoid: [String],
  naturalRemedies: [String],
  healthScore: { type: Number, default: 75 },
  summary: { type: String, default: "" },
  rawInput: { type: String },
  dietPreference: { type: String, enum: ['vegetarian', 'non-vegetarian'], default: 'non-vegetarian' },
  duration: { type: String },
  severity: { type: String },
  frequency: { type: String },
  worseCondition: { type: String },
  existingConditions: { type: String },
  medications: { type: String },
  lifestyle: { type: String },
});

export default mongoose.model("HealthReport", healthReportSchema);
