const jwt = require("jsonwebtoken");

const startQrSession = async (req, res) => {
  try {
    console.log("START QR HIT");

    const qrToken = jwt.sign(
      {
        facultyId: "TEMP_FACULTY_ID",
        ts: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "2m" }
    );

    res.json({
      qrToken,
      expiresIn: 120,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "QR failed" });
  }
};

const endQrSession = async (req, res) => {
  res.json({ success: true });
};

module.exports = {
  startQrSession,
  endQrSession,
};
