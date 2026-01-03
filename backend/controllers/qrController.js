const jwt = require("jsonwebtoken");
const QRSession = require("../models/QRSession");
const Attendance = require("../models/Attendance");

exports.generateQR = async (req, res) => {
  if (req.user.role !== "FACULTY")
    return res.status(403).json("Only faculty allowed");

  const qrToken = jwt.sign(
    { facultyId: req.user.id },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  await QRSession.create({
    facultyId: req.user.id,
    token: qrToken
  });

  res.json({ qrToken });
};

exports.scanQR = async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (req.user.role !== "STUDENT")
    return res.status(403).json("Only students allowed");

  await Attendance.create({
    studentId: req.user.id,
    facultyId: decoded.facultyId
  });

  res.json("Attendance marked successfully");
};
