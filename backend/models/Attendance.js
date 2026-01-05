const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionToken: { type: String, required: true },
  markedAt: { type: Date, default: Date.now }
});

// Prevent duplicate attendance per session
AttendanceSchema.index(
  { studentId: 1, sessionToken: 1 },
  { unique: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
