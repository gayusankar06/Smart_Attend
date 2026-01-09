import { useEffect } from "react";

export default function PrincipalDashboard() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "PRINCIPAL") {
      window.location.href = "/";
    }
  }, []);

  /* ================= WORKING MODE DATA ================= */
  const stats = {
    totalStudents: 1250,
    attendance: "86%",
    atRisk: 45,
    avgMarks: "82%",
  };

  const departments = [
    { dept: "CSE", att: "79%", risk: 2, total: 4, status: "Good" },
    { dept: "ECE", att: "90%", risk: 0, total: 2, status: "Excellent" },
    { dept: "EEE", att: "85%", risk: 0, total: 1, status: "Excellent" },
    { dept: "IT", att: "91%", risk: 0, total: 1, status: "Excellent" },
    { dept: "MECH", att: "78%", risk: 0, total: 1, status: "Good" },
  ];

  const principalInsights = [
    "Overall attendance has improved by 4% compared to last semester",
    "CSE and IT departments show strong academic engagement",
    "Early intervention reduced at-risk students by 12%",
    "Departments with more lab sessions show better attendance",
    "Predictive trend suggests improvement before internals",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-yellow-400 px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-white font-bold text-xl">
          👑 Principal Dashboard
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
        <StatCard value={stats.attendance} label="College Attendance" />
        <StatCard value={stats.atRisk} label="At Risk Students" />
        <StatCard value={stats.avgMarks} label="Avg Marks" />
      </section>

      {/* DEPARTMENT PERFORMANCE */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          Department Performance
        </h2>

        <table className="w-full">
          <thead className="bg-yellow-50">
            <tr>
              <th className="p-3 text-left">Department</th>
              <th className="p-3">Avg Attendance</th>
              <th className="p-3">At Risk</th>
              <th className="p-3">Total Students</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.dept} className="border-t">
                <td className="p-3 font-semibold">{d.dept}</td>
                <td className="p-3 text-center">{d.att}</td>
                <td className="p-3 text-center">{d.risk}</td>
                <td className="p-3 text-center">{d.total}</td>
                <td className="p-3 text-center">
                  <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm">
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* INSIGHTS */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          📊 Institutional Insights & Predictions
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          {principalInsights.map((i, idx) => (
            <li key={idx}>{i}</li>
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
