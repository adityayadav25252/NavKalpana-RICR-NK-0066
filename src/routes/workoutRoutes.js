const express = require("express");
const router = express.Router();
const WorkoutController = require("../controllers/workoutController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/generate", authMiddleware, WorkoutController.createPlan);
router.get("/latest", authMiddleware, WorkoutController.getLatestPlan);

module.exports = router;