import { useEffect, useState } from "react";
import axios from "axios";

export default function HodDashboard() {
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState({
    totalStudents: 0,
    avgAttendance: 0,
    atRiskCount: 0,
    departmentRank: "0%",
  });
  const [loading, setLoading] = useState(true);

  // Counsel modal state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reason, setReason] = useState("");

  // =========================
  // LOAD DASHBOARD DATA
  // =========================
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/hod/dashboard"
      );

      setStudents(res.data.atRiskStudents || []);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Dashboard load error", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // =========================
  // COUNSEL STUDENT
  // =========================
  const submitCounsel = async () => {
    if (!reason.trim()) {
      alert("Please enter counseling reason");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/hod/counsel", {
        studentId: selectedStudent.studentId,
        reason,
      });

      alert("Student counseled successfully");
      setSelectedStudent(null);
      setReason("");
      loadDashboard();
    } catch (err) {
      console.error("Counsel error", err);
      alert("Failed to counsel student");
    }
  };

  if (loading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-yellow-400 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 text-white font-bold text-xl">
          📄 HOD Dashboard - CSE
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Prof. HOD</span>
          <button
            onClick={handleLogout}
            className="bg-white text-yellow-500 px-4 py-1 rounded-md font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 mt-8">
        <StatCard
          color="text-blue-600"
          value={summary.totalStudents}
          label="Total Students"
        />
        <StatCard
          color="text-green-600"
          value={`${summary.avgAttendance}%`}
          label="Avg Attendance"
        />
        <StatCard
          color="text-red-600"
          value={summary.atRiskCount}
          label="At Risk Students"
        />
        <StatCard
          color="text-purple-600"
          value={summary.departmentRank}
          label="Department Rank"
        />
      </section>

      {/* AT RISK TABLE */}
      <section className="bg-white mx-8 mt-10 rounded-xl shadow">
        <div className="p-6 text-yellow-500 font-bold text-lg flex items-center gap-2">
          ⚠ At-Risk Students (Below 75%)
        </div>

        <table className="w-full">
          <thead className="bg-yellow-50 text-yellow-600">
            <tr>
              <th className="p-4 text-left">Roll No</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Attendance</th>
              <th className="p-4 text-left">Avg Marks</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No at-risk students
                </td>
              </tr>
            )}

            {students.map((s) => (
              <tr key={s.studentId} className="border-t">
                <td className="p-4 font-semibold">{s.rollNo}</td>
                <td className="p-4">{s.name}</td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md">
                    {s.attendance}%
                  </span>
                </td>
                <td className="p-4">{s.avgMarks}%</td>
                <td className="p-4">
                  <StatusBadge status={s.status} />
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedStudent(s)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                  >
                    Counsel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* COUNSEL MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="font-bold mb-3">
              Counsel {selectedStudent.name}
            </h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter counseling reason..."
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitCounsel}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* REUSABLE COMPONENTS */

function StatCard({ value, label, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Needs Counseling": "bg-blue-100 text-blue-700",
    Warning: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-3 py-1 rounded-md text-sm ${map[status]}`}>
      {status}
    </span>
  );
}
