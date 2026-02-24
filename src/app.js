const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);

module.exports = app;