import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Menu, X, Loader2 } from "lucide-react";
import {
  FaHome,
  FaUserCircle,
  FaInbox,
  FaPlusCircle,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const handleLogout = async () => {
    if (loading) return; // Avoid duplicate logout
    setLoading(true);
    try {
      await logout();
      toast.success("Successfully logged out.", { id: "logout-toast" });
    } catch (error) {
      toast.error("Failed to logout.", { id: "logout-error" });
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { to: "/home", label: "Home", icon: <FaHome /> },
    { to: "/profile", label: "Profile", icon: <FaUserCircle /> },
    { to: "/inbox", label: "Inbox", icon: <FaInbox /> },
    { to: "/add", label: "Add ur Item", icon: <FaPlusCircle /> },
    { to: "/my-items", label: "Items", icon: <FaBoxOpen /> },
  ];

  return (
    <nav className="bg-[#1A237E] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold">
          AcadX
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-[#FF7043] flex items-center gap-1"
              >
                {icon} {label}
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-[#E53935] hover:bg-[#c62828] text-white px-4 py-1 rounded flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <FaSignOutAlt />
                )}
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {open && (
        <ul className="md:hidden py-2 px-4 pb-3 space-y-3 bg-white text-[#212121]">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[#3F51B5] hover:text-[#FF7043]"
              >
                {icon} {label}
              </Link>
            </li>
          ))}

          {user && (
            <li className="flex items-center">
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                disabled={loading}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded shadow disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <FaSignOutAlt size={14} />
                )}
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
