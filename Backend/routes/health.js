const express = require("express");
const router = express.Router();

const { getHealths, newHealth } = require("../controllers/healthController");

router.route("/healths").get(getHealths);
router.route("/health/new").post(newHealth);

module.exports = router;
