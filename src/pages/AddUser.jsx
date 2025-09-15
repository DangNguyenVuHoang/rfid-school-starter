import { useState } from "react";
import { db } from "../firebase";
import { ref, push, set, serverTimestamp } from "firebase/database";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [klass, setKlass] = useState("");
  const [rfid, setRfid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersRef = ref(db, "users");
    const newRef = push(usersRef);
    await set(newRef, {
      name,
      email,
      class: klass,
      rfid: rfid || null,
      createdAt: serverTimestamp(),
      lastSeen: null,
    });
    setName("");
    setEmail("");
    setKlass("");
    setRfid("");
    alert("✅ Đã thêm user!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        ➕ Thêm người dùng
      </h2>

      <input
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        placeholder="Lớp (VD: 12A1)"
        value={klass}
        onChange={(e) => setKlass(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        placeholder="RFID (tùy chọn)"
        value={rfid}
        onChange={(e) => setRfid(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Lưu
      </button>
    </form>
  );
}
