const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Global middleware that every request passes through before reaching the API.
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CutBook backend is running" });
});

app.use("/", apiRoutes);

// Fallback middleware keeps unmatched routes predictable for clients.
app.use(notFound);

// Centralized error handling keeps controller code focused on business logic.
app.use(errorHandler);

module.exports = app;
