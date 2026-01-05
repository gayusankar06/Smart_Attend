import { useEffect, useState } from "react";
import axios from "axios";
import ScanQr from "../../components/ScanQr";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser || storedUser.role !== "STUDENT") {
        window.location.href = "/";
        return;
      }

      setUser(storedUser);
      setLoading(false);
    } catch (err) {
      window.location.href = "/";
    }
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
    } catch (e) {}

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
      {/* ================= HEADER ================= */}
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

      {/* ================= QR SCAN ================= */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setScanOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-3 rounded-xl font-semibold shadow"
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
            onSuccess={(msg) => {
              setMessage(msg || "Attendance marked successfully");
              setScanOpen(false);
            }}
            onClose={() => setScanOpen(false)}
          />
        </div>
      )}

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-8">
        <StatCard value="—" label="Overall Attendance" />
        <StatCard value="—" label="Average Marks" />
        <StatCard value="—" label="Current Grade" />
      </section>

      {/* ================= SUBJECT PERFORMANCE ================= */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold text-lg mb-6">
          📚 Subject-wise Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SubjectCard name="Cyber Security" />
          <SubjectCard name="IoT" />
          <SubjectCard name="Cloud Computing" />
          <SubjectCard name="Python" />
          <SubjectCard name="DSA" />
        </div>

        <p className="text-xs text-gray-400 mt-6">
          * Data will update automatically as faculty sessions are attended.
        </p>
      </section>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function StatCard({ value, label }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <div className="text-3xl font-bold text-gray-700">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function SubjectCard({ name }) {
  return (
    <div className="border rounded-xl p-6 text-center">
      <h3 className="font-semibold text-lg">{name}</h3>
      <div className="text-gray-400 text-sm mt-2">
        Attendance will appear after sessions
      </div>
    </div>
  );
}
