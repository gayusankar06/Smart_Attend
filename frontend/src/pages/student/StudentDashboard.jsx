import { useEffect, useState } from "react";
import { scanQr, getAttendance } from "../../api/studentApi";

export default function StudentDashboard() {
  const [qrToken, setQrToken] = useState("");
  const [attendance, setAttendance] = useState([]);

  const handleScan = async () => {
    try {
      await scanQr({ token: qrToken });
      alert("Attendance marked successfully");
      loadAttendance();
    } catch {
      alert("Invalid or expired QR");
    }
  };

  const loadAttendance = async () => {
    const res = await getAttendance();
    setAttendance(res.data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🎓 Student Dashboard</h1>

      {/* QR SCAN */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Scan QR for Attendance</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Paste QR Token"
          value={qrToken}
          onChange={(e) => setQrToken(e.target.value)}
        />
        <button
          onClick={handleScan}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Attendance
        </button>
      </div>

      {/* SUBJECT ATTENDANCE */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Subject-wise Attendance</h2>
        {attendance.length === 0 && <p>No attendance yet</p>}
        <ul>
          {attendance.map((a, i) => (
            <li key={i} className="border-b py-2">
              Faculty: {a.facultyId} | Date: {new Date(a.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      {/* INSIGHTS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Attendance Insights</h2>
        <p>Total Classes Attended: {attendance.length}</p>
        <p>Status: {attendance.length < 5 ? "⚠️ At Risk" : "✅ Good"}</p>
      </div>
    </div>
  );
}
