import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import axios from "axios";

export default function ScanQr({ onSuccess, onClose }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          await axios.post(
            "http://localhost:5000/api/student/attendance/mark",
            { qrToken: decodedText },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );

          scanner.clear();
          onSuccess("Attendance marked successfully");
        } catch (err) {
          alert(err.response?.data?.message || "QR scan failed");
        }
      },
      (error) => {
        // ignore scan errors (camera noise)
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div>
      <div id="qr-reader" className="w-full" />
      <button
        onClick={onClose}
        className="mt-4 bg-gray-200 px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
}
