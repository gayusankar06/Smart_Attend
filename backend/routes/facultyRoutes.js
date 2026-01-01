const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/attendance", authMiddleware, async (req, res) => {
if (req.user.role !== "FACULTY") return res.sendStatus(403);


const records = await Attendance.find({ facultyId: req.user.id });
res.json(records);
});


module.exports = router;