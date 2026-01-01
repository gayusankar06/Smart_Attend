const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const QrSession = require("../models/QrSession");


exports.generateQR = async (req, res) => {
const token = jwt.sign({ facultyId: req.user.id }, process.env.JWT_SECRET, { expiresIn: "5m" });
const qrImage = await QRCode.toDataURL(token);


await QrSession.create({ facultyId: req.user.id, token, expiresAt: new Date(Date.now() + 5 * 60000) });
res.json({ qrImage });
};