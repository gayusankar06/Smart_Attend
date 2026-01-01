const mongoose = require("mongoose");


const qrSchema = new mongoose.Schema({
facultyId: mongoose.Schema.Types.ObjectId,
token: String,
expiresAt: Date
});


module.exports = mongoose.model("QrSession", qrSchema);