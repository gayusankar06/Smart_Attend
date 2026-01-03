const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getFacultyAttendance } = require("../controllers/facultyController");

router.get("/attendance", auth, getFacultyAttendance);

module.exports = router;
