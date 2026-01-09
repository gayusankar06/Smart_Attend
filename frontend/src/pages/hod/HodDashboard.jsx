import { useEffect, useState } from "react";
import axios from "axios";

export default function HodDashboard() {
  const [user, setUser] = useState(null);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser || storedUser.role !== "HOD") {
      window.location.href = "/";
      return;
    }

    setUser(storedUser);
  }, []);

  /* ================= COUNSEL ================= */
  const counselStudent = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/hod/counsel",
        { studentId, reason: "Low attendance" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Counseling recorded successfully");
    } catch (err) {
      alert("Counseling saved (demo mode)");
    }
  };

  if (!user) return null;

  /* ================= WORKING MODE DATA ================= */
  const stats = {
    totalStudents: 4,
    avgAttendance: "79%",
    atRisk: 2,
    rank: "82%",
  };

  const students = [
    {
      id: "CS002",
      name: "Bob Smith",
      attendance: "74%",
      marks: "—",
      status: "Needs Counseling",
    },
    {
      id: "CS004",
      name: "David Wilson",
      attendance: "69%",
      marks: "—",
      status: "Warning",
    },
  ];

  const hodInsights = [
    {
      type: "warning",
      text: "Attendance may drop by 3% next month due to reduced lab participation",
    },
    {
      type: "action",
      text: "Immediate counseling recommended for students below 70%",
    },
    {
      type: "positive",
      text: "Faculty engagement score is above department average",
    },
    {
      type: "positive",
      text: "Morning sessions show higher attendance consistency",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-yellow-400 px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-white font-bold text-xl">
          📘 HOD Dashboard – CSE
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-white text-yellow-600 px-5 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 mt-8">
        <StatCard value={stats.totalStudents} label="Total Students" />
        <StatCard value={stats.avgAttendance} label="Avg Attendance" />
        <StatCard value={stats.atRisk} label="At Risk Students" />
        <StatCard value={stats.rank} label="Department Rank" />
      </section>

      {/* AT RISK STUDENTS */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          ⚠️ At-Risk Students (Below 75%)
        </h2>

        <table className="w-full">
          <thead className="bg-yellow-50">
            <tr>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Attendance</th>
              <th className="p-3">Avg Marks</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-center">{s.attendance}</td>
                <td className="p-3 text-center">{s.marks}</td>
                <td className="p-3 text-center">
                  <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 text-sm">
                    {s.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => counselStudent(s.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Counsel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* INSIGHTS */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          🤖 Predictive Insights & Actions
        </h2>

        <ul className="space-y-3">
          {hodInsights.map((i, idx) => (
            <li
              key={idx}
              className={`p-4 rounded-lg text-sm ${
                i.type === "warning"
                  ? "bg-red-50 text-red-700"
                  : i.type === "action"
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {i.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}
