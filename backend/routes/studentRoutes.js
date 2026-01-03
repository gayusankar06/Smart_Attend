const express = require("express");
const router = express.Router();

const { getStudentAttendance } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/attendance",
  authMiddleware(["STUDENT"]),
  getStudentAttendance
);

module.exports = router;
