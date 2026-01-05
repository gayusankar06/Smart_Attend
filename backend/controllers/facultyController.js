const QrSession = require("../models/QrSession");
const Attendance = require("../models/Attendance");
const crypto = require("crypto");

/* ================= START QR SESSION ================= */
exports.startQrSession = async (req, res) => {
  if (req.user.role !== "FACULTY") {
    return res.status(403).json({ message: "Access denied" });
  }

  // Disable previous active sessions
  await QrSession.updateMany(
    { facultyId: req.user._id, active: true },
    { active: false }
  );

  const token = crypto.randomBytes(16).toString("hex");

  const session = await QrSession.create({
    facultyId: req.user._id,
    token,
    expiresAt: new Date(Date.now() + 45 * 1000),
  });

  res.json({
    success: true,
    qrToken: session.token,
    expiresIn: 45,
  });
};

/* ================= END QR SESSION ================= */
exports.endQrSession = async (req, res) => {
  await QrSession.updateMany(
    { facultyId: req.user._id, active: true },
    { active: false }
  );

  res.json({ success: true, message: "Session ended" });
};

/* ================= STUDENT SCAN QR ================= */
exports.scanQr = async (req, res) => {
  const { token } = req.body;

  const session = await QrSession.findOne({
    token,
    active: true,
    expiresAt: { $gt: new Date() },
  });

  if (!session) {
    return res.status(400).json({ message: "QR expired or invalid" });
  }

  const alreadyMarked = await Attendance.findOne({
    studentId: req.user._id,
    qrToken: token,
  });

  if (alreadyMarked) {
    return res.status(400).json({ message: "Attendance already marked" });
  }

  await Attendance.create({
    studentId: req.user._id,
    facultyId: session.facultyId,
    qrToken: token,
  });

  res.json({ success: true, message: "Attendance marked" });
};

/* ================= FACULTY ATTENDANCE ================= */
exports.getFacultyAttendance = async (req, res) => {
  if (req.user.role !== "FACULTY") {
    return res.status(403).json({ message: "Access denied" });
  }

  const attendance = await Attendance.find({
    facultyId: req.user._id,
  }).sort({ markedAt: -1 });

  res.json(attendance);
};
