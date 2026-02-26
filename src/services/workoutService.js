const db = require("../config/db");

class WorkoutService {

  // 🔥 Generate Plan (POST)
  static async generatePlan(userId, body) {

    const { goal, experience_level, activity_level } = body;

    if (!goal || !experience_level || !activity_level) {
      throw new Error("goal, experience_level and activity_level are required");
    }

    let sets, reps, rest;

    // ✅ Safe Progressive Structure
    if (experience_level === "beginner") {
      sets = 2;
      reps = "12-15";
      rest = "90 sec";
    } else if (experience_level === "intermediate") {
      sets = 3;
      reps = "8-12";
      rest = "60 sec";
    } else {
      sets = 4;
      reps = "6-10";
      rest = "45 sec";
    }

    const week = [
      { day: "Monday", focus: "Upper Body" },
      { day: "Tuesday", focus: "Lower Body" },
      { day: "Wednesday", focus: "Cardio & Core" },
      { day: "Thursday", focus: "Push Muscles" },
      { day: "Friday", focus: "Pull Muscles" },
      { day: "Saturday", focus: "Full Body" },
      { day: "Sunday", focus: "Active Recovery" }
    ];

    const exercises = {
      "Upper Body": [
        { name: "Push-ups", tip: "Keep body straight and core tight." },
        { name: "Bench Press", tip: "Control the bar and avoid locking elbows." },
        { name: "Shoulder Press", tip: "Do not arch your lower back." }
      ],
      "Lower Body": [
        { name: "Squats", tip: "Keep knees aligned with toes." },
        { name: "Lunges", tip: "Keep torso upright and step controlled." },
        { name: "Leg Press", tip: "Do not lock knees at the top." }
      ],
      "Cardio & Core": [
        { name: "Plank", tip: "Maintain neutral spine." },
        { name: "Jump Rope", tip: "Stay light on your feet." },
        { name: "Mountain Climbers", tip: "Keep hips low and core tight." }
      ],
      "Push Muscles": [
        { name: "Chest Press", tip: "Control the movement." },
        { name: "Tricep Dips", tip: "Keep elbows close to body." },
        { name: "Incline Push-ups", tip: "Maintain straight body alignment." }
      ],
      "Pull Muscles": [
        { name: "Pull-ups", tip: "Avoid swinging your body." },
        { name: "Lat Pulldown", tip: "Pull elbows down and back." },
        { name: "Barbell Row", tip: "Keep back flat." }
      ],
      "Full Body": [
        { name: "Deadlift", tip: "Keep neutral spine and drive through heels." },
        { name: "Burpees", tip: "Land softly and control breathing." },
        { name: "Kettlebell Swings", tip: "Use hips, not arms." }
      ],
      "Active Recovery": [
        { name: "Walking", tip: "Maintain steady breathing." },
        { name: "Stretching", tip: "Hold each stretch 20-30 sec." },
        { name: "Yoga", tip: "Focus on slow breathing." }
      ]
    };

    const weekly_plan = week.map(d => ({
      day: d.day,
      focus: d.focus,
      exercises: exercises[d.focus].map(ex => ({
        exercise_name: ex.name,
        sets_reps: d.focus === "Active Recovery"
          ? "20-30 minutes"
          : d.focus === "Cardio & Core" && ex.name === "Plank"
          ? `${sets} × 30-45 sec`
          : `${sets} × ${reps}`,
        rest_interval: d.focus === "Active Recovery" ? "N/A" : rest,
        form_guidance: ex.tip
      }))
    }));

    const finalPlan = {
      goal,
      experience_level,
      activity_level,
      progression_rule: {
        beginner: "Lower volume (2 sets)",
        intermediate: "Moderate volume (3 sets)",
        advanced: "Higher volume (4 sets)"
      },
      weekly_plan
    };

    await db.promise().query(
      "INSERT INTO workout_plans (user_id, plan_json) VALUES (?, ?)",
      [userId, JSON.stringify(finalPlan)]
    );

    return finalPlan;
  }

  // 🔥 GET Latest Plan
  static async getLatestPlan(userId) {

    const [rows] = await db.promise().query(
      "SELECT plan_json FROM workout_plans WHERE user_id = ? ORDER BY id DESC LIMIT 1",
      [userId]
    );

    if (!rows.length) {
      throw new Error("No workout plan found");
    }

    return JSON.parse(rows[0].plan_json);
  }
}

module.exports = WorkoutService;