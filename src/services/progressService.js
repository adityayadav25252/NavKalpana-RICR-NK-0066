const db = require("../config/db");

// CREATE LOG
exports.createLog = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO progress_logs SET ?";
    db.query(sql, data, (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, ...data });
    });
  });
};

// GET USER ANALYTICS
exports.getAnalytics = (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM progress_logs
      WHERE user_id = ?
      ORDER BY week_start_date ASC
      LIMIT 12
    `;

    db.query(sql, [user_id], (err, logs) => {
      if (err) return reject(err);

      if (logs.length === 0)
        return resolve({ message: "No progress data found" });

      const totalWeeks = logs.length;

      const completed = logs.filter(l => l.workout_status === "Completed").length;
      const partial = logs.filter(l => l.workout_status === "Partial").length;

      const workoutPercent =
        ((completed + partial * 0.5) / totalWeeks) * 100;

      const followed = logs.filter(l => l.diet_status === "Followed").length;
      const mostly = logs.filter(l => l.diet_status === "Mostly").length;

      const dietPercent =
        ((followed + mostly * 0.5) / totalWeeks) * 100;

      const weightTrend = logs.map(l => ({
        week: l.week_start_date,
        weight: l.weight
      }));

      resolve({
        total_weeks: totalWeeks,
        weight_trend: weightTrend,
        workout_completion_percent: workoutPercent.toFixed(2),
        diet_adherence_percent: dietPercent.toFixed(2)
      });
    });
  });
};