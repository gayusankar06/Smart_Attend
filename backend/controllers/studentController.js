const Attendance = require("../models/Attendance");

exports.getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.user.id;

    const records = await Attendance.find({ studentId })
      .populate("facultyId", "name email")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
