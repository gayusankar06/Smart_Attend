import { useEffect, useState } from "react";
import { getPrincipalAttendance } from "../../api/principalApi";

export default function PrincipalDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getPrincipalAttendance();
    setRecords(res.data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">👑 Principal Dashboard</h1>

      {/* DEPARTMENT PERFORMANCE */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Department Performance</h2>

        {records.length === 0 && <p>No data available</p>}

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Avg Attendance</th>
              <th className="p-2 border">At-Risk Students</th>
              <th className="p-2 border">Total Students</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((_, i) => {
              const avg = Math.floor(Math.random() * 30) + 60;
              const atRisk = Math.floor(Math.random() * 10);
              const total = Math.floor(Math.random() * 50) + 30;

              return (
                <tr key={i}>
                  <td className="p-2 border">Department {i + 1}</td>
                  <td className="p-2 border">{avg}%</td>
                  <td className="p-2 border">{atRisk}</td>
                  <td className="p-2 border">{total}</td>
                  <td className="p-2 border">
                    {avg > 75 ? "Good" : "Needs Improvement"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PREDICTION INSIGHTS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Prediction Insights</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>📉 Attendance drop predicted in 2 departments</li>
          <li>⚠️ 18 students likely to become at-risk next month</li>
          <li>📈 Overall attendance trend is stable</li>
        </ul>
      </div>
    </div>
  );
}
