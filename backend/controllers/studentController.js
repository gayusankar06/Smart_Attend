const QrSession = require("../models/QrSession");
const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { qrToken } = req.body;

    if (!qrToken) {
      return res.status(400).json({ message: "QR token required" });
    }

    const session = await QrSession.findOne({
      token: qrToken,
      isActive: true,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(400).json({ message: "QR expired or invalid" });
    }

    await Attendance.create({
      studentId: req.user.id,
      facultyId: session.facultyId,
      sessionToken: qrToken
    });

    res.json({
      success: true,
      message: "Attendance marked successfully"
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Attendance already marked"
      });
    }

    res.status(500).json({
      message: "Attendance marking failed"
    });
  }
};
