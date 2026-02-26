const express = require("express");
const router = express.Router();
const controller = require("../controllers/bodyMeasurementController");

router.post("/", controller.createMeasurement);
router.get("/:user_id", controller.getMeasurements);

module.exports = router;