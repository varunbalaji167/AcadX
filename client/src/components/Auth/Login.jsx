// import React, { useState } from "react";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { Loader } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../contexts/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     toast.dismiss();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}users/login`,
//         formData
//       );
//       login(res.data);
//       toast.success("Login successful!", { id: "login-success" });
//     } catch (err) {
//       toast.error(err.response?.data?.message || " Login failed", {
//         id: "login-error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#F3F6FA] px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-8 border-[#FFD54F]"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-[#2A6FDB] mb-6">
//           AcadX Login
//         </h2>

//         <div className="mb-5 relative">
//           <FaEnvelope className="absolute left-3 top-3.5 text-[#6B7280]" />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email (only @iiti.ac.in)"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] text-[#333333]"
//           />
//         </div>

//         <div className="mb-6 relative">
//           <FaLock className="absolute left-3 top-3.5 text-[#6B7280]" />
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] text-[#333333]"
//           />
//           <div
//             className="absolute right-3 top-3.5 text-[#6B7280] cursor-pointer"
//             onClick={() => setShowPassword((prev) => !prev)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 bg-[#2A6FDB] hover:bg-[#245dc0] text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//         >
//           {loading ? (
//             <>
//               <Loader className="animate-spin" size={18} />
//               Logging in...
//             </>
//           ) : (
//             "Login"
//           )}
//         </button>

//         <p className="text-sm text-center text-[#6B7280] mt-4">
//           Need help? Contact support@AcadX.in
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}users/login`,
        formData
      );
      login(res.data);
      toast.success("Login successful!", { id: "login-success" });
    } catch (err) {
      toast.error(err.response?.data?.message || " Login failed", {
        id: "login-error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border-t-8 border-[#FF7043] transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#3F51B5] mb-6">
          AcadX Login
        </h2>

        <div className="mb-5 relative">
          <FaEnvelope className="absolute left-3 top-3.5 text-[#757575]" />
          <input
            type="email"
            name="email"
            placeholder="Email (only @iiti.ac.in)"
            value={formData.email}
            onChange={handleChange}
            required
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121] bg-white"
          />
        </div>

        <div className="mb-6 relative">
          <FaLock className="absolute left-3 top-3.5 text-[#757575]" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121] bg-white"
          />
          <div
            className="absolute right-3 top-3.5 text-[#757575] cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#3F51B5] hover:bg-[#2c3ea6] text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={18} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-sm text-center text-[#757575] mt-4">
          Need help? Contact <a href="mailto:support@AcadX.in" className="text-[#3F51B5] font-medium">support@AcadX.in</a>
        </p>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#757575]">
            Not a member?{" "}
            <Link
              to="/register"
              className="inline-flex items-center gap-1 text-[#FF7043] hover:text-[#e55a2d] font-semibold transition"
            >
              <FaUserPlus size={14} />
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;