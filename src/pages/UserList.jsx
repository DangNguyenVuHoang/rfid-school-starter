import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users");
    const off = onValue(usersRef, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, u]) => ({ id, ...u }));
      setUsers(list);
    });
    return () => off();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        📋 Danh sách người dùng
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b">Tên</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Lớp</th>
              <th className="py-3 px-4 border-b">RFID</th>
              <th className="py-3 px-4 border-b">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 border-b">{u.name}</td>
                <td className="py-3 px-4 border-b text-gray-600">{u.email}</td>
                <td className="py-3 px-4 border-b">{u.class || "-"}</td>
                <td className="py-3 px-4 border-b font-mono text-blue-600">
                  {u.rfid || "-"}
                </td>
                <td className="py-3 px-4 border-b text-gray-500">
                  {u.lastSeen
                    ? new Date(u.lastSeen).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-center text-gray-500 italic"
                >
                  Không có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
