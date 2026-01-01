const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");

exports.getStudentDashboard = async (req, res) => {
  const studentId = req.user.id;

  const attendance = await Attendance.find({ studentId });
  const marks = await Marks.find({ studentId });

  const totalClasses = attendance.length;
  const attendancePercent = totalClasses
    ? Math.min(100, Math.round((attendance.length / 100) * 100))
    : 0;

  const avgMarks =
    marks.reduce((a, b) => a + b.marks, 0) / (marks.length || 1);

  const grade =
    avgMarks >= 90 ? "A" : avgMarks >= 75 ? "B" : "C";

  res.json({
    attendancePercent,
    avgMarks: Math.round(avgMarks),
    grade
  });
};
