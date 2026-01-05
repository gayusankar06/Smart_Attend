const QrSession = require("../models/QrSession");
const crypto = require("crypto");

exports.createQrSession = async (req, res) => {
  try {
    const token = `QR-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    const session = await QrSession.create({
      token,
      facultyId: req.user.id,
      expiresAt: new Date(Date.now() + 45 * 1000) // 45 seconds
    });

    res.json({
      success: true,
      token: session.token,
      expiresIn: 45
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "QR generation failed"
    });
  }
};
