const express = require("express");
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Express backend!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
