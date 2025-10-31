import HealthReport from "../models/HealthReport.js";

// ✅ Create report (from frontend analysis or backend AI)
export const createReport = async (req, res) => {
  try {
    const report = new HealthReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: "Error creating report", error: error.message });
  }
};

// ✅ Get all reports for a user
export const getReportsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await HealthReport.find({ userId }).sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

// ✅ Get single report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await HealthReport.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
};

// ✅ Delete a report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HealthReport.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
};

// ✅ Calculate average health score for a user
export const getAverageHealthScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await HealthReport.find({ userId });
    if (reports.length === 0) return res.json({ averageScore: 0 });

    const total = reports.reduce((sum, r) => sum + r.healthScore, 0);
    const averageScore = Math.round(total / reports.length);

    res.json({ averageScore });
  } catch (error) {
    res.status(500).json({ message: "Error calculating average", error: error.message });
  }
};
