const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const hodRoutes = require("./routes/hodRoutes");
const principalRoutes = require("./routes/principalRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running on 5000");
});

app.use("/api/auth", authRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/hod", hodRoutes);
app.use("/api/principal", principalRoutes);

app.listen(5000, () =>
  console.log("Backend running on 5000")
);
