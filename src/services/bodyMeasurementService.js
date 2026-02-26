const db = require("../config/db");

// ✅ Add Measurement
exports.addMeasurement = async (data) => {

  const query = `
    INSERT INTO body_measurements 
    (user_id, measurement_date, waist, chest, hips, arms, thighs)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.user_id,
    data.measurement_date,
    data.waist,
    data.chest,
    data.hips,
    data.arms,
    data.thighs
  ];

  const [result] = await db.execute(query, values);

  return {
    id: result.insertId,
    ...data
  };
};


// ✅ Get Analytics
exports.getMeasurementAnalytics = async (user_id) => {

  const query = `
    SELECT * FROM body_measurements
    WHERE user_id = ?
    ORDER BY measurement_date ASC
  `;

  const [rows] = await db.execute(query, [user_id]);

  if (!rows.length) {
    return null;
  }

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const changeSinceStart = {
    waist: +(latest.waist - first.waist).toFixed(2),
    chest: +(latest.chest - first.chest).toFixed(2),
    hips: +(latest.hips - first.hips).toFixed(2),
    arms: +(latest.arms - first.arms).toFixed(2),
    thighs: +(latest.thighs - first.thighs).toFixed(2)
  };

  return {
    total_records: rows.length,
    measurement_change_since_start: changeSinceStart,
    line_graph_data: rows
  };
};