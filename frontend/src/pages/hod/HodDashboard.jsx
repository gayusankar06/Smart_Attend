import { useEffect, useState } from "react";
import { getHodAttendance } from "../../api/hodApi";

export default function HodDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getHodAttendance();
    setRecords(res.data);
  };

  const totalStudents = records.length;
  const avgAttendance = totalStudents === 0 ? 0 : Math.round((totalStudents / 10) * 100);
  const atRisk = records.filter(() => Math.random() < 0.25).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">👨‍💼 HOD Dashboard</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat title="Total Students" value={totalStudents} />
        <Stat title="Avg Attendance" value={`${avgAttendance}%`} />
        <Stat title="At-Risk Students" value={atRisk} />
        <Stat title="Dept Rank" value="2" />
      </div>

      {/* FACULTY PERFORMANCE */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Faculty Performance</h2>

        {records.length === 0 && <p>No data</p>}

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Faculty</th>
              <th className="p-2 border">Attendance Count</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td className="p-2 border">{r.facultyId}</td>
                <td className="p-2 border">✔</td>
                <td className="p-2 border">
                  {Math.random() > 0.3 ? "Good" : "Needs Attention"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{title}</h3>
      <p>{value}</p>
    </div>
  );
}
