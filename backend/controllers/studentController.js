const jwt = require("jsonwebtoken");
const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { qrToken } = req.body;
    if (!qrToken) {
      return res.status(400).json({ message: "QR token required" });
    }

    const decoded = jwt.verify(qrToken, process.env.JWT_SECRET);

    await Attendance.create({
      studentId: req.user.id,
      facultyId: decoded.facultyId,
      subject: "Cyber Security",
      sessionToken: qrToken,
    });

    res.json({ success: true, message: "Attendance marked" });
  } catch (err) {
    console.error("ATTENDANCE ERROR:", err);
    res.status(400).json({ message: "QR expired or invalid" });
  }
};

module.exports = { markAttendance };
