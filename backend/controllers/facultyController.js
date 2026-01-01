const Attendance = require("../models/Attendance");

exports.getFacultyDashboard = async (req, res) => {
  const facultyId = req.user.id;

  const attendance = await Attendance.find({ facultyId });

  const totalStudents = new Set(attendance.map(a => a.studentId.toString())).size;

  res.json({
    expected: 60,
    present: totalStudents,
    pending: 60 - totalStudents
  });
};
