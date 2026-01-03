const Attendance = require("../models/Attendance");
const User = require("../models/User");

exports.getDepartmentAttendance = async (req, res) => {
  try {
    // Example: HOD can see all students attendance
    const records = await Attendance.find()
      .populate("studentId", "name email")
      .populate("facultyId", "name email")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
