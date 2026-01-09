const mongoose = require("mongoose");

const QrSessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model("QrSession", QrSessionSchema);
