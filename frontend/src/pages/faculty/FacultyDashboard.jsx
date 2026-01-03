import { useEffect, useState } from "react";
import { generateQr, getFacultyAttendance } from "../../api/facultyApi";

export default function FacultyDashboard() {
  const [qrToken, setQrToken] = useState("");
  const [active, setActive] = useState(false);
  const [attendance, setAttendance] = useState([]);

  const startSession = async () => {
    const res = await generateQr();
    setQrToken(res.data.qrToken);
    setActive(true);
  };

  const endSession = () => {
    setQrToken("");
    setActive(false);
  };

  const loadAttendance = async () => {
    const res = await getFacultyAttendance();
    setAttendance(res.data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const totalStudents = attendance.length;
  const avgAttendance = totalStudents === 0 ? 0 : Math.round((totalStudents / 10) * 100);
  const atRisk = attendance.filter(() => Math.random() < 0.3).length; // demo

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">👨‍🏫 Faculty Dashboard</h1>

      {/* QR SESSION */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">
          QR Attendance – {active ? "🟢 ACTIVE" : "🔴 STOPPED"}
        </h2>

        {!active ? (
          <button
            onClick={startSession}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Start QR Session
          </button>
        ) : (
          <>
            <p className="mb-2 break-all">QR TOKEN:</p>
            <div className="bg-gray-100 p-2 rounded text-sm mb-3">
              {qrToken}
            </div>
            <button
              onClick={endSession}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              End Session
            </button>
          </>
        )}
      </div>

      {/* CLASS ANALYTICS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Avg Attendance</h3>
          <p>{avgAttendance}%</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Avg Marks</h3>
          <p>72%</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">At Risk</h3>
          <p>{atRisk}</p>
        </div>
      </div>

      {/* STUDENT OVERVIEW */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Student Overview</h2>

        {attendance.length === 0 && <p>No attendance records</p>}

        <ul>
          {attendance.map((a, i) => (
            <li key={i} className="border-b py-2">
              Student: {a.studentId} |{" "}
              {new Date(a.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
