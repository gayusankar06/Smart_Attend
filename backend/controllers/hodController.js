const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");
const Counseling = require("../models/Counseling");

/**
 * =========================
 * GET HOD DASHBOARD
 * =========================
 */
const getHodDashboard = async (req, res) => {
  try {
    const students = await User.find({ role: "STUDENT" });
    const studentIds = students.map(s => s._id);

    const attendance = await Attendance.find({
      studentId: { $in: studentIds },
    });

    const avgAttendance =
      attendance.length === 0
        ? 0
        : Math.round(
            attendance.reduce((sum, a) => sum + a.percentage, 0) /
              attendance.length
          );

    const atRiskAttendance = attendance.filter(a => a.percentage < 75);

    const atRiskStudents = await Promise.all(
      atRiskAttendance.map(async (a) => {
        const student = students.find(s => s._id.equals(a.studentId));
        const marks = await Marks.findOne({ studentId: a.studentId });

        return {
          studentId: student._id,
          rollNo: student.rollNo,
          name: student.name,
          attendance: a.percentage,
          avgMarks: marks?.average || 0,
          status: a.percentage < 70 ? "Warning" : "Needs Counseling",
        };
      })
    );

    res.status(200).json({
      success: true,
      summary: {
        totalStudents: students.length,
        avgAttendance,
        atRiskCount: atRiskStudents.length,
        departmentRank: "82%",
      },
      atRiskStudents,
      facultyPerformance: {
        name: "Dr. Raj Kumar",
        attendance: 92,
        engagement: 88,
        status: "Excellent",
      },
      insights: [
        "Attendance may drop by 3% next month due to lab engagement",
        "Encourage faculty to monitor lab sessions closely",
      ],
    });
  } catch (err) {
    console.error("HOD dashboard error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

/**
 * =========================
 * COUNSEL STUDENT
 * =========================
 */
const counselStudent = async (req, res) => {
  try {
    const { studentId, reason } = req.body;

    if (!studentId || !reason) {
      return res.status(400).json({
        success: false,
        message: "studentId and reason required",
      });
    }

    const hod = await User.findOne({ role: "HOD" });

    const record = await Counseling.create({
      studentId,
      hodId: hod._id,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Counseling saved",
      record,
    });
  } catch (err) {
    console.error("Counsel error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to counsel student",
    });
  }
};

module.exports = {
  getHodDashboard,
  counselStudent,
};
