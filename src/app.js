const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
<<<<<<< HEAD
const workoutRoutes = require("./routes/workoutRoutes");
const progressRoutes = require("./routes/progressRoutes");
const bodyMeasurementRoutes = require("./routes/bodyMeasurementRoutes");
=======
>>>>>>> eb86250e8d4fc78104a086de5be98189f1eafaf3

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
<<<<<<< HEAD
app.use("/api", bodyMeasurementRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/workout", workoutRoutes);
=======
>>>>>>> eb86250e8d4fc78104a086de5be98189f1eafaf3
app.use("/api/health", healthRoutes);

module.exports = app;