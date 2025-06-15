// import React, { useState } from "react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (formData.password !== formData.confirmPassword) {
//     toast.error("Passwords do not match");
//     return;
//   }

//   try {
//     const { email, password } = formData;
//     const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}users/register`,{ email, password });
//     toast.success(res.data.message || "Registration successful!");
//     navigate("/login"); // ✅ Redirect to login
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Registration failed");
//   }
// };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Student Register</h2>

//         <div className="mb-4 relative">
//           <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email (only @iiti.ac.in)"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="mb-4 relative">
//           <FaLock className="absolute left-3 top-3.5 text-gray-400" />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div className="mb-6 relative">
//           <FaLock className="absolute left-3 top-3.5 text-gray-400" />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//             className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { FaEnvelope, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (formData.password !== formData.confirmPassword) {
      toast.error("🚫 Passwords do not match", { id: "register-mismatch" });
      return;
    }

    setLoading(true);
    try {
      const { email, password } = formData;
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}users/register`,
        { email, password }
      );
      toast.success(res.data.message || "✅ Registration successful!", {
        id: "register-success",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Registration failed", {
        id: "register-failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border-t-8 border-[#81C784] transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#3F51B5] mb-6">
          Student Register
        </h2>

        {/* Email Field */}
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

        {/* Password Field */}
        <div className="mb-5 relative">
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
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3.5 text-[#757575] cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 relative">
          <FaLock className="absolute left-3 top-3.5 text-[#757575]" />
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121] bg-white"
          />
          <span
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-3.5 text-[#757575] cursor-pointer"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#3F51B5] hover:bg-[#2c3ea6] text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={18} />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#757575]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-[#FF7043] hover:text-[#e55a2d] font-semibold transition"
            >
              <FaArrowLeft size={14} />
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;