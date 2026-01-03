const Attendance = require("../models/Attendance");

exports.getFacultyAttendance = async (req, res) => {
  const data = await Attendance.find({ facultyId: req.user.id });
  res.json(data);
};
