const User = require("../models/User");
const Attendance = require("../models/Attendance");

const getPrincipalDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "STUDENT" });

    res.status(200).json({
      success: true,

      // 👇 EXACTLY what frontend expects
      stats: {
        totalStudents,
        avgAttendance: 84,
        atRiskStudents: Math.floor(totalStudents * 0.12),
      },

      departments: [
        {
          dept: "CSE",
          avgAttendance: 86,
          atRisk: 14,
          totalStudents: 320,
          status: "Excellent",
        },
        {
          dept: "ECE",
          avgAttendance: 82,
          atRisk: 18,
          totalStudents: 280,
          status: "Good",
        },
        {
          dept: "EEE",
          avgAttendance: 80,
          atRisk: 12,
          totalStudents: 220,
          status: "Good",
        },
        {
          dept: "IT",
          avgAttendance: 88,
          atRisk: 9,
          totalStudents: 210,
          status: "Excellent",
        },
      ],

      insights: [
        "Overall attendance trend is improving",
        "Early counseling reduces at-risk students",
      ],
    });
  } catch (err) {
    console.error("Principal dashboard error:", err);
    res.status(500).json({ message: "Failed to load dashboard" });
  }
};

module.exports = { getPrincipalDashboard };
