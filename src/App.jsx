import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddUser from "./pages/AddUser.jsx";
import UserList from "./pages/UserList.jsx";
import SimulateScan from "./pages/SimulateScan.jsx";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex-shrink-0 text-xl font-bold text-blue-600">
              RFID Manager
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Danh sách
              </Link>
              <Link
                to="/add"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Thêm user
              </Link>
              <Link
                to="/simulate"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Giả lập RFID
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {open ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-blue-600"
            >
              Danh sách
            </Link>
            <Link
              to="/add"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-blue-600"
            >
              Thêm user
            </Link>
            <Link
              to="/simulate"
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-blue-600"
            >
              Giả lập RFID
            </Link>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/simulate" element={<SimulateScan />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
