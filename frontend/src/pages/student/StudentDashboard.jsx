import { useEffect, useState } from "react";
import axios from "axios";
import ScanQr from "../../components/ScanQr";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [stats, setStats] = useState({
    attendance: "94%",
    marks: "91%",
    grade: "A",
  });

  const subjects = [
    { name: "Cyber Security", attendance: "90%" },
    { name: "IoT", attendance: "85%" },
    { name: "Cloud Computing", attendance: "88%" },
    { name: "Python", attendance: "92%" },
    { name: "DSA", attendance: "87%" },
  ];

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser || storedUser.role !== "STUDENT") {
      window.location.href = "/";
      return;
    }

    setUser(storedUser);
    setLoading(false);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
    } catch {}

    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Student Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-yellow-400 px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-white font-bold text-xl">
          🎓 Student Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-white font-medium">{user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-yellow-600 px-5 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* QR SCAN */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setScanOpen(true)}
          className="bg-yellow-400 text-white px-8 py-3 rounded-xl font-semibold shadow"
        >
          📱 Scan QR to Mark Attendance
        </button>
      </div>

      {message && (
        <div className="mx-8 mt-4 text-center text-green-600 font-semibold">
          {message}
        </div>
      )}

      {scanOpen && (
        <div className="bg-white mx-8 mt-6 p-6 rounded-xl shadow">
          <ScanQr
            onSuccess={() => {
              setMessage("Attendance marked successfully");
              setScanOpen(false);
              setStats({ attendance: "94%", marks: "91%", grade: "A" });
            }}
            onClose={() => setScanOpen(false)}
          />
        </div>
      )}

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-8">
        <StatCard value={stats.attendance} label="Overall Attendance" />
        <StatCard value={stats.marks} label="Average Marks" />
        <StatCard value={stats.grade} label="Current Grade" />
      </section>

      {/* SUBJECTS */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-6">
          📚 Subject-wise Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((s) => (
            <SubjectCard key={s.name} {...s} />
          ))}
        </div>
      </section>

      {/* MONTHLY TREND */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          📈 Monthly Attendance Trend
        </h2>
        <p>September – 91%</p>
        <p>October – 93%</p>
        <p>November – 94%</p>
      </section>

      {/* INSIGHTS */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          🤖 Smart Insights
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Your attendance has improved consistently</li>
          <li>Attendance above 90% boosts internal marks</li>
          <li>Lab participation improves subject scores</li>
        </ul>
      </section>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function SubjectCard({ name, attendance }) {
  return (
    <div className="border rounded-xl p-6 text-center">
      <h3 className="font-semibold">{name}</h3>
      <div className="text-2xl font-bold text-green-600 mt-2">
        {attendance}
      </div>
      <div className="text-gray-500 text-sm">Attendance</div>
    </div>
  );
}
