const express = require("express");
const router = express.Router();

const { getDepartmentAttendance } = require("../controllers/hodController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/attendance",
  authMiddleware(["HOD"]),
  getDepartmentAttendance
);

module.exports = router;
