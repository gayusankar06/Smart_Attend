const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  marks: Number
});

module.exports =
  mongoose.models.Marks ||
  mongoose.model("Marks", marksSchema);
