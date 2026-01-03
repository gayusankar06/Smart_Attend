const mongoose = require("mongoose");

const qrSessionSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports =
  mongoose.models.QRSession ||
  mongoose.model("QRSession", qrSessionSchema);
