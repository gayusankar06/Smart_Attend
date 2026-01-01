const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/attendance", authMiddleware, async (req, res) => {
if (req.user.role !== "HOD") return res.sendStatus(403);


const students = await User.find({ department: req.user.department, role: "STUDENT" });
const ids = students.map(s => s._id);


const records = await Attendance.find({ studentId: { $in: ids } });
res.json(records);
});


module.exports = router;