import { useState } from "react";
import { db } from "../firebase";
import { ref, push, serverTimestamp } from "firebase/database";

export default function SimulateScan() {
  const [rfid, setRfid] = useState("");
  const [deviceId, setDeviceId] = useState("web-sim");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logsRef = ref(db, "rfid_logs");
    await push(logsRef, {
      rfid,
      ts: Date.now(),
      deviceId,
      source: "web",
      createdAt: serverTimestamp(),
    });
    setRfid("");
    alert("📡 Đã ghi log quét RFID!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        📡 Giả lập quét RFID
      </h2>

      <input
        placeholder="Mã RFID"
        value={rfid}
        onChange={(e) => setRfid(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Gửi log
      </button>
    </form>
  );
}
