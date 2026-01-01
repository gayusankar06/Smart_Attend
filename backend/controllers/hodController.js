const Attendance = require("../models/Attendance");
const User = require("../models/User");

exports.getHodDashboard = async (req, res) => {
  const students = await User.find({ role: "STUDENT" });
  const attendance = await Attendance.find();

  const avgAttendance = Math.round((attendance.length / 100) * 100);
  const atRisk = students.filter(s => s.attendance < 75).length;

  res.json({
    totalStudents: students.length,
    avgAttendance,
    atRisk,
    departmentRank: "82%"
  });
};
