// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";
// import { Menu, X, Loader2 } from "lucide-react";
// import {
//   FaHome,
//   FaUserCircle,
//   FaInbox,
//   FaPlusCircle,
//   FaBoxOpen,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleMenu = () => setOpen(!open);

//   const handleLogout = async () => {
//     if (loading) return; // Avoid duplicate logout
//     setLoading(true);
//     try {
//       await logout();
//       toast.success("Successfully logged out.", { id: "logout-toast" });
//     } catch (error) {
//       toast.error("Failed to logout.", { id: "logout-error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navLinks = [
//     { to: "/home", label: "Home", icon: <FaHome /> },
//     { to: "/profile", label: "Profile", icon: <FaUserCircle /> },
//     { to: "/inbox", label: "Inbox", icon: <FaInbox /> },
//     { to: "/add", label: "Add ur Item", icon: <FaPlusCircle /> },
//     { to: "/my-items", label: "Items", icon: <FaBoxOpen /> },
//   ];

//   return (
//     <nav className="bg-[#1A237E] text-white sticky top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/home" className="text-2xl font-bold">
//           AcadX
//         </Link>

//         <div className="md:hidden">
//           <button onClick={toggleMenu}>
//             {open ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         <ul className="hidden md:flex items-center gap-6">
//           {navLinks.map(({ to, label, icon }) => (
//             <li key={to}>
//               <Link
//                 to={to}
//                 className="hover:text-[#FF7043] flex items-center gap-1"
//               >
//                 {icon} {label}
//               </Link>
//             </li>
//           ))}

//           {user && (
//             <li>
//               <button
//                 onClick={handleLogout}
//                 disabled={loading}
//                 className="bg-[#E53935] hover:bg-[#c62828] text-white px-4 py-1 rounded flex items-center gap-2"
//               >
//                 {loading ? (
//                   <Loader2 className="animate-spin" size={16} />
//                 ) : (
//                   <FaSignOutAlt />
//                 )}
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>

//       {open && (
//         <ul className="md:hidden py-2 px-4 pb-3 space-y-3 bg-white text-[#212121]">
//           {navLinks.map(({ to, label, icon }) => (
//             <li key={to}>
//               <Link
//                 to={to}
//                 onClick={() => setOpen(false)}
//                 className="flex items-center gap-2 text-[#3F51B5] hover:text-[#FF7043]"
//               >
//                 {icon} {label}
//               </Link>
//             </li>
//           ))}

//           {user && (
//             <li className="flex items-center">
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setOpen(false);
//                 }}
//                 disabled={loading}
//                 className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded shadow disabled:opacity-70 disabled:cursor-not-allowed transition duration-200"
//               >
//                 {loading ? (
//                   <Loader2 className="animate-spin" size={16} />
//                 ) : (
//                   <FaSignOutAlt size={14} />
//                 )}
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

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
    if (loading) return;
    setLoading(true);
    try {
      await logout();
      toast.success("Successfully logged out.", { id: "logout-toast" });
    } catch {
      toast.error("Failed to logout.", { id: "logout-error" });
    } finally {
      setLoading(false);
    }
  };

  const navLinksLeft = [
    { to: "/home", label: "Home", icon: <FaHome size={16} /> },
    { to: "/profile", label: "Profile", icon: <FaUserCircle size={16} /> },
    { to: "/inbox", label: "Inbox", icon: <FaInbox size={16} /> },
  ];

  const navLinksRight = [
    { to: "/add", label: "Add Item", icon: <FaPlusCircle size={16} /> },
    { to: "/my-items", label: "Items", icon: <FaBoxOpen size={16} /> },
  ];

  const isAdmin = user?.user?.role === "admin";

  return (
    <nav className="bg-[#1A237E] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to={isAdmin ? "/admin" : "/home"}
          className="text-2xl font-extrabold tracking-wide hover:text-[#FFCC80] transition-all"
        >
          AcadX
        </Link>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinksLeft.concat(navLinksRight).map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-2 hover:text-[#FF7043] transition"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}

          {/* Admin Links */}
          {isAdmin && (
            <>
              <li>
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 transition flex items-center"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/users"
                  className="px-3 py-1 rounded-full border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 transition flex items-center"
                >
                  Users
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/items"
                  className="px-3 py-1 rounded-full border border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100 transition flex items-center"
                >
                  Items
                </Link>
              </li>
            </>
          )}

          {/* Logout */}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition px-4 py-1.5 rounded text-white shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <FaSignOutAlt size={16} />
                )}
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Navigation (4 left, 1 right, admin also on right) */}
      {open && (
        <div className="md:hidden bg-white text-[#1A237E] shadow-lg border-t px-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* LEFT SECTION — 4 LINKS */}
            <div className="space-y-2">
              <Link
                to="/home"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-100 transition"
              >
                <FaHome size={16} />
                Home
              </Link>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-100 transition"
              >
                <FaUserCircle size={16} />
                Profile
              </Link>

              <Link
                to="/inbox"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-100 transition"
              >
                <FaInbox size={16} />
                Inbox
              </Link>

              <Link
                to="/add"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-100 transition"
              >
                <FaPlusCircle size={16} />
                Add Item
              </Link>
            </div>

            {/* RIGHT SECTION — 1 MAIN LINK + ADMIN LINKS */}
            <div className="space-y-2 text-right">
              {/* Single normal app link */}
              <Link
                to="/my-items"
                onClick={() => setOpen(false)}
                className="flex justify-end items-center gap-2 py-2 px-2 rounded hover:bg-gray-100 transition"
              >
                Items
                <FaBoxOpen size={16} />
              </Link>

              {/* ADMIN LINKS ON RIGHT */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex justify-end items-center gap-2 text-blue-600 py-2 px-2 rounded hover:bg-blue-50"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/admin/users"
                    onClick={() => setOpen(false)}
                    className="flex justify-end items-center gap-2 text-green-600 py-2 px-2 rounded hover:bg-green-50"
                  >
                    Users
                  </Link>

                  <Link
                    to="/admin/items"
                    onClick={() => setOpen(false)}
                    className="flex justify-end items-center gap-2 text-orange-600 py-2 px-2 rounded hover:bg-orange-50"
                  >
                    Items
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* LOGOUT */}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded shadow disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <FaSignOutAlt size={16} />
              )}
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
