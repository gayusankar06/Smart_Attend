const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/stats", authMiddleware, async (req, res) => {
if (req.user.role !== "PRINCIPAL") return res.sendStatus(403);


const total = await Attendance.countDocuments();
res.json({ totalAttendance: total });
});


module.exports = router;