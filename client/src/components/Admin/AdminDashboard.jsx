import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getDashboardStats } from "../../utils/adminService";
import { Loader } from "lucide-react";
import Footer from "../Footer";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data.data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F6FA]">
      <Navbar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader className="animate-spin text-[#2A6FDB]" size={45} />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Admin Dashboard 📊
            </h1>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Items"
                value={stats.totalItems}
                color="bg-green-500"
              />
              <StatCard
                title="Total Requests"
                value={stats.totalRequests}
                color="bg-yellow-500"
              />
              <StatCard
                title="Pending Requests"
                value={stats.pendingRequests}
                color="bg-red-500"
              />
            </div>

            {/* MANAGEMENT BUTTONS */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
              Management Tools
            </h2>

            <div className="flex flex-wrap gap-4">
              <a
                href="/admin/users"
                className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                Manage Users
              </a>
              <a
                href="/admin/items"
                className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                Moderate Items
              </a>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-xl shadow-lg`}>
    <p className="text-sm font-medium opacity-80">{title}</p>
    <p className="text-4xl font-extrabold mt-1">{value}</p>
  </div>
);

export default AdminDashboard;
