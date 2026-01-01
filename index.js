require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const hodRoutes = require("./routes/hodRoutes");
const principalRoutes = require("./routes/principalRoutes");


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


app.use("/api/auth", authRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/hod", hodRoutes);
app.use("/api/principal", principalRoutes);


app.listen(process.env.PORT, () => console.log(`Backend running on ${process.env.PORT}`));