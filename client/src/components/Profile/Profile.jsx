import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  FaUser,
  FaIdBadge,
  FaGraduationCap,
  FaBook,
  FaQuoteLeft,
  FaImage,
  FaEdit,
  FaPlusCircle,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    degree: "",
    bio: "",
    major: "",
    avatar: "",
    averageRating: 0,
    sustainabilityScore: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}users/me`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.data) {
        const ratings = res.data.ratingsReceived || [];
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;

        setFormData({
          name: res.data.name || "",
          rollNo: res.data.rollNo || "",
          degree: res.data.degree || "",
          bio: res.data.bio || "",
          major: res.data.major || "",
          avatar: res.data.avatar || "",
          averageRating: parseFloat(averageRating.toFixed(1)),
          sustainabilityScore: res.data.sustainabilityScore || 0,
        });

        setProfileExists(Boolean(res.data.name || res.data.rollNo));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (!toast.isActive("fetch_error")) {
        toast.error("Failed to load profile.", { id: "fetch_error" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchProfile();
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_BASE_URL}users/me`;
    try {
      await axios.put(url, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Profile updated successfully", { id: "update_success" });
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong!", { id: "update_error" });
    }
  };

return (
  <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
    <Navbar />

    {loading ? (
      <div className="flex-1 flex max-w-xl mx-auto justify-center items-center">
        <Loader2 className="animate-spin text-[#3F51B5]" size={40} />
      </div>
    ) : (
      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 xl:px-20 2xl:px-40 py-10">
        <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-10">
          <h2 className="text-3xl font-bold text-[#212121] mb-6 flex items-center gap-2">
            <FaUser className="text-[#3F51B5]" /> My Profile
          </h2>

{isEditing ? (
  <form onSubmit={handleSubmit} className="space-y-5">
    {[{ icon: <FaUser />, label: "Full Name", name: "name" },
      { icon: <FaIdBadge />, label: "Roll No / Student ID", name: "rollNo" },
      { icon: <FaGraduationCap />, label: "Degree", name: "degree" },
      { icon: <FaBook />, label: "Major", name: "major" },
      { icon: <FaQuoteLeft />, label: "Bio", name: "bio", textarea: true },
      { icon: <FaImage />, label: "Avatar URL (optional)", name: "avatar" },
    ].map(({ icon, label, name, textarea }) => (
      <div key={name}>
        <label className="flex items-center gap-2 mb-1 font-semibold text-[#212121]">
          {icon} {label}
        </label>
        {textarea ? (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#3F51B5]"
            rows={4}
          />
        ) : (
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#3F51B5]"
          />
        )}
      </div>
    ))}
    <button
      type="submit"
      className="w-full bg-[#3F51B5] text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#303F9F]"
    >
      <FaEdit /> Save Profile
    </button>
  </form>
) : profileExists ? (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-[#212121]">
    {/* Avatar */}
    {formData.avatar && (
      <img
        src={formData.avatar}
        alt="avatar"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#3F51B5] object-cover"
      />
    )}

    {/* Details */}
    <div className="flex-1 space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold flex items-center gap-2">
            <FaUser className="text-[#3F51B5]" /> {formData.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Student ID</p>
          <p className="flex items-center gap-2">
            <FaIdBadge className="text-[#3F51B5]" /> {formData.rollNo}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Degree</p>
          <p className="flex items-center gap-2">
            <FaGraduationCap className="text-[#3F51B5]" /> {formData.degree}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Major</p>
          <p className="flex items-center gap-2">
            <FaBook className="text-[#3F51B5]" /> {formData.major}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">About Me</p>
        <p className="flex items-start gap-2">
          <FaQuoteLeft className="text-[#3F51B5] mt-1" /> {formData.bio}
        </p>
      </div>

      <div className="flex items-center gap-6 mt-2">
        <p className="flex items-center gap-2 text-[#FFD600] text-sm font-medium">
          ⭐ {formData.averageRating} / 5
        </p>
        <p className="flex items-center gap-2 text-[#43A047] text-sm font-medium">
          🌱 Eco Level: {formData.sustainabilityScore}
        </p>
      </div>

<button
  onClick={() => setIsEditing(true)}
  className="mt-6 px-6 py-3 bg-[#FF7043] text-white rounded-md flex items-center justify-center gap-2 hover:bg-[#e85f36]"
>
  <FaEdit /> Edit Profile
</button>
    </div>
  </div>
) : (
  <div className="text-center text-[#757575]">
    <p>No profile data found.</p>
    <button
      onClick={() => setIsEditing(true)}
      className="mt-4 bg-[#43A047] text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#388E3C]"
    >
      <FaPlusCircle /> Create Profile
    </button>
  </div>
)}
        </div>
      </main>
    )}

    <Footer />
  </div>
);

};

export default Profile;
