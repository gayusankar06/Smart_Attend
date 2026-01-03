const Attendance = require("../models/Attendance");
const jwt = require("jsonwebtoken");

exports.scanQR = async (req, res) => {
  try {
    if (req.user.role !== "STUDENT")
      return res.status(403).json({ message: "Only students allowed" });

    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await Attendance.create({
      studentId: req.user.id,
      facultyId: decoded.facultyId,
      subject: "Cyber Security"
    });

    res.json({ message: "Attendance marked" });
  } catch {
    res.status(401).json({ message: "QR expired" });
  }
};
