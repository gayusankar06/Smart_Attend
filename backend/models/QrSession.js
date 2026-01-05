const mongoose = require("mongoose");

const QrSessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});

// Auto-delete expired QR sessions
QrSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("QrSession", QrSessionSchema);
