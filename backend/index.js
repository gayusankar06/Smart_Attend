require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running on 5000");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/hod", require("./routes/hodRoutes"));
app.use("/api/principal", require("./routes/principalRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});
