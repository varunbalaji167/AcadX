import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getAllUsers, toggleUserBan } from "../../utils/adminService";
import toast from "react-hot-toast";
import { FaUserSlash, FaUserCheck } from "react-icons/fa";
import { Loader } from "lucide-react";
import Footer from "../Footer";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(page, 20);
      if (data.success) {
        setUsers(data.data);
        setPages(data.pages);
      }
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (userId) => {
    try {
      const response = await toggleUserBan(userId);
      if (response.success) {
        toast.success(response.message);
        fetchUsers();
      }
    } catch {
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FA]">
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          User Management
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader className="animate-spin text-[#2A6FDB]" size={45} />
          </div>
        ) : (
          <>
            {/* TABLE */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name / Email
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 transition">
                      {/* NAME / EMAIL */}
                      <td className="px-5 py-5 text-sm">
                        <p className="text-gray-900 font-bold">
                          {u.name || "No Name"}
                        </p>
                        <p className="text-gray-600">{u.email}</p>
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-5 text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 rounded-full opacity-50 ${
                              u.role === "admin"
                                ? "bg-purple-200"
                                : "bg-green-200"
                            }`}
                          ></span>
                          <span className="relative capitalize">{u.role}</span>
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5 text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span
                            aria-hidden
                            className={`absolute inset-0 rounded-full opacity-50 ${
                              u.status === "Banned"
                                ? "bg-red-200"
                                : "bg-blue-200"
                            }`}
                          ></span>
                          <span className="relative">{u.status}</span>
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-5 text-sm">
                        {u.role !== "admin" && (
                          <button
                            onClick={() => handleBanToggle(u._id)}
                            className={`flex items-center gap-2 px-3 py-1 shadow rounded text-white transition ${
                              u.status === "Banned"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                          >
                            {u.status === "Banned" ? (
                              <>
                                <FaUserCheck /> Unban
                              </>
                            ) : (
                              <>
                                <FaUserSlash /> Ban
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              <span className="font-semibold text-gray-700">
                Page {page} of {pages}
              </span>

              <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminUsers;
