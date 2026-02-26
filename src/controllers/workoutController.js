const WorkoutService = require("../services/workoutService");

class WorkoutController {

  static async createPlan(req, res) {
    try {
      const userId = req.user.id;

      const plan = await WorkoutService.generatePlan(userId, req.body);

      res.status(201).json({
        success: true,
        message: "Workout plan generated successfully",
        data: plan
      });

    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  static async getLatestPlan(req, res) {
    try {
      const userId = req.user.id;

      const plan = await WorkoutService.getLatestPlan(userId);

      res.status(200).json({
        success: true,
        data: plan
      });

    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = WorkoutController;