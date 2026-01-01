const User = require("../models/User");
const Attendance = require("../models/Attendance");

exports.getPrincipalDashboard = async (req, res) => {
  const students = await User.find({ role: "STUDENT" });
  const attendance = await Attendance.find();

  res.json({
    totalStudents: students.length,
    collegeAttendance: 86,
    atRiskStudents: 45,
    avgMarks: 82
  });
};
