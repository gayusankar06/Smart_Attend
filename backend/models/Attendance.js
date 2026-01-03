const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  date: { type: Date, default: Date.now }
});

module.exports =
  mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);
