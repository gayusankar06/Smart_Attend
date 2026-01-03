exports.getOverallAttendance = async (req, res) => {
  res.json([
    {
      department: "CSE",
      avgAttendance: 84,
      atRisk: 22,
      totalStudents: 420,
      status: "Good"
    }
  ]);
};
