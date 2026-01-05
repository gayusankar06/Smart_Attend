// principalController.js
const Attendance = require("../models/Attendance");
exports.getOverallAttendance = async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
};
