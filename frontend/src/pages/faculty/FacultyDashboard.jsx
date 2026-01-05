import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

/*
  ===============================
  FACULTY DASHBOARD (SAFE VERSION)
  ===============================
*/

export default function FacultyDashboard() {
  const [active, setActive] = useState(false);
  const [qrToken, setQrToken] = useState("");
  const [seconds, setSeconds] = useState(45);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      window.location.href = "/";
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "FACULTY") {
      window.location.href = "/";
    }
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          regenerateQr();
          return 45;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active]);

  /* ================= QR ================= */
  const startSession = () => {
    regenerateQr();
    setActive(true);
    setSeconds(45);
  };

  const regenerateQr = () => {
    // TEMP token (replace with backend later)
    const token = `QR-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    setQrToken(token);
  };

  const endSession = () => {
    setActive(false);
    setQrToken("");
    setSeconds(45);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-yellow-400 px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-white font-bold text-xl">
          👁 Faculty Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white text-yellow-600 px-5 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </header>

      {/* QR CONTROL */}
      <div className="bg-white mx-8 mt-8 p-6 rounded-xl shadow flex justify-between items-center">
        <h2 className="text-yellow-500 font-bold text-lg">
          🎯 Dynamic QR Attendance System
        </h2>

        {!active ? (
          <button
            onClick={startSession}
            className="bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Start New Session
          </button>
        ) : (
          <button
            onClick={endSession}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold"
          >
            End Session
          </button>
        )}
      </div>

      {/* QR DISPLAY */}
      {active && (
        <div className="bg-white mx-8 mt-6 p-6 rounded-xl shadow text-center">
          <div className="border-4 border-yellow-300 inline-block p-4 rounded bg-white">
            <QRCodeCanvas value={qrToken} size={220} />
          </div>

          <p className="mt-4 text-gray-600">
            QR Code expires in{" "}
            <span className="text-red-500 font-bold">
              {seconds}
            </span>{" "}
            seconds
          </p>

          <p className="mt-2 text-xs text-gray-400 break-all">
            Token: {qrToken}
          </p>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-8 mt-8">
        <StatCard value="79%" label="Avg Attendance" />
        <StatCard value="77%" label="Avg Marks" />
        <StatCard value="60" label="Total Students" />
        <StatCard value="12" label="At Risk" />
      </div>

      {/* STUDENT OVERVIEW */}
      <div className="bg-white mx-8 mt-8 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          Student Overview
        </h2>

        <p className="text-gray-600">
          Attendance records will appear here in real-time.
        </p>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ value, label }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}

