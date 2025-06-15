import { useEffect, useState } from "react";
import { FaUserCircle, FaRegSmileBeam } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Requests from "./Requests";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserAvatar = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}users/me`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.data?.avatar) {
        setAvatar(res.data.avatar);
      }
    } catch (error) {
      console.error("Error loading user info:", error);
      if (!toast.isActive("dashboard_fetch_error")) {
        toast.error("Unable to load user info", { id: "dashboard_fetch_error" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchUserAvatar();
    }
  }, [user]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <Navbar />

      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="animate-spin text-[#3F51B5]" size={40} />
        </div>
      ) : (
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-[#E0E0E0]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Avatar + Title */}
              <div className="flex items-center gap-4">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-[#3F51B5]"
                  />
                ) : (
                  <FaUserCircle className="text-[#3F51B5] text-5xl" />
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#212121]">
                    Welcome to AcadX
                  </h1>
                  <p className="text-[#757575] mt-1 text-sm sm:text-base">
                    This is your personalized student dashboard.
                  </p>
                </div>
              </div>

              {/* Right: Quote */}
              <div className="flex items-center text-[#81C784] gap-2 text-sm font-medium">
                <FaRegSmileBeam />
                <span className="text-center sm:text-right">Share Knowledge, Save Trees 🌱</span>
              </div>
            </div>
          </div>

          {/* Requests Panel */}
          <div className="bg-white rounded-xl shadow p-4 border border-[#E0E0E0]">
            <h2 className="text-xl font-semibold text-[#3F51B5] mb-4">
              Your Requests
            </h2>
            <Requests />
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;