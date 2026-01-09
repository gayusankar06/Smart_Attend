import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function FacultyDashboard() {
  const [active, setActive] = useState(false);
  const [qrToken, setQrToken] = useState("");
  const [seconds, setSeconds] = useState(45);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "FACULTY") {
      window.location.href = "/";
    }
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          endSession();
          return 45;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active]);

  /* ================= START SESSION ================= */
  const startSession = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/faculty/qr/start",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setQrToken(data.qrToken);
    setActive(true);
    setSeconds(45);
  };

  /* ================= END SESSION ================= */
  const endSession = () => {
    setActive(false);
    setQrToken("");
    setSeconds(45);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-yellow-400 px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-white font-bold text-xl">
          👁 Faculty Dashboard
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
            Start Session
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
          <QRCodeCanvas value={qrToken} size={220} />
          <p className="mt-4 text-gray-600">
            QR expires in{" "}
            <span className="text-red-500 font-bold">{seconds}</span> seconds
          </p>
          <p className="mt-2 text-xs text-gray-400 break-all">
            Token: {qrToken}
          </p>
        </div>
      )}

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-8 mt-8">
        <StatCard value="60" label="Expected" />
        <StatCard value="52" label="Present" />
        <StatCard value="8" label="Pending" />
        <StatCard value="87%" label="Avg Attendance" />
      </section>

      {/* SESSION SUMMARY */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          📊 Session Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <Summary value="52" label="Students Present" />
          <Summary value="8" label="Students Absent" />
          <Summary value="87%" label="Session Attendance" />
        </div>
      </section>

      {/* FACULTY INSIGHTS */}
      <section className="bg-white mx-8 mt-10 p-6 rounded-xl shadow">
        <h2 className="text-yellow-500 font-bold mb-4">
          🤖 Faculty Insights
        </h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Morning sessions show higher participation</li>
          <li>QR attendance reduces proxy attendance</li>
          <li>Early identification helps at-risk students</li>
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

function Summary({ value, label }) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
