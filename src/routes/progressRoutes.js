const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

router.post("/", progressController.createProgress);
router.get("/:user_id", progressController.getProgress);

module.exports = router;