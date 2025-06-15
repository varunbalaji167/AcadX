// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useAuth } from "../contexts/AuthContext";
// import { Loader2 } from "lucide-react";
// import Navbar from "../Navbar";
// import {
//   FaTag,
//   FaAlignLeft,
//   FaLayerGroup,
//   FaExchangeAlt,
//   FaBook,
//   FaUniversity,
//   FaClipboardCheck,
//   FaImage,
// } from "react-icons/fa";

// const ItemForm = ({ onSuccess }) => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     exchangeType: "Donate",
//     courseCode: "",
//     department: "",
//     condition: "",
//     imageUrl: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         images: formData.imageUrl ? [{ url: formData.imageUrl }] : [],
//       };
//       delete payload.imageUrl;

//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}items`, payload, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });

//       toast.success("Item listed successfully!", { id: "item-list-success" });

//       setFormData({
//         title: "",
//         description: "",
//         category: "",
//         exchangeType: "Donate",
//         courseCode: "",
//         department: "",
//         condition: "",
//         imageUrl: "",
//       });

//       onSuccess && onSuccess();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to list item", {
//         id: "item-list-error",
//       });
//     }
//     setLoading(false);
//   };

//   const renderInput = (
//     icon,
//     placeholder,
//     name,
//     type = "text",
//     isTextarea = false
//   ) => (
//     <div className="relative w-full">
//       {React.createElement(icon, {
//         className:
//           "absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]",
//       })}
//       {isTextarea ? (
//         <textarea
//           name={name}
//           placeholder={placeholder}
//           onChange={handleChange}
//           value={formData[name]}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] resize-none text-[#333333] placeholder-[#6B7280] bg-white"
//         />
//       ) : (
//         <input
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           onChange={handleChange}
//           value={formData[name]}
//           className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] text-[#333333] placeholder-[#6B7280] bg-white"
//           required={name !== "imageUrl"}
//         />
//       )}
//     </div>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#F3F6FA] py-10 px-4">
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
//         >
//           <h2 className="text-3xl font-bold text-[#2A6FDB] flex items-center gap-2">
//             📦 List a New Item
//           </h2>

//           {renderInput(FaTag, "Title", "title")}
//           {renderInput(FaAlignLeft, "Description", "description", "text", true)}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Category */}
//             <div className="relative">
//               <FaLayerGroup className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
//               <select
//                 name="category"
//                 onChange={handleChange}
//                 value={formData.category}
//                 className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] text-[#333333]"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="Textbooks">Textbooks</option>
//                 <option value="Labkits">Lab Kits</option>
//                 <option value="Stationery">Stationery</option>
//               </select>
//             </div>

//             {/* Exchange Type */}
//             <div className="relative">
//               <FaExchangeAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
//               <select
//                 name="exchangeType"
//                 onChange={handleChange}
//                 value={formData.exchangeType}
//                 className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] text-[#333333]"
//               >
//                 <option value="Donate">Donate</option>
//                 <option value="Swap">Swap</option>
//               </select>
//             </div>
//           </div>

//           {renderInput(FaBook, "Course Code (e.g., CS101)", "courseCode")}
//           {renderInput(FaUniversity, "Department", "department")}
//           {/* Condition Dropdown */}
//           <div className="relative">
//             <FaClipboardCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
//             <select
//               name="condition"
//               onChange={handleChange}
//               value={formData.condition}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6FDB] text-[#333333]"
//               required
//             >
//               <option value="">Select Condition</option>
//               <option value="New">New</option>
//               <option value="Good">Good</option>
//               <option value="Used">Used</option>
//               <option value="Worn">Worn</option>
//             </select>
//           </div>
//           {renderInput(FaImage, "Google Drive Image URL", "imageUrl")}

//           <button
//             type="submit"
//             className="w-full bg-[#2A6FDB] hover:bg-[#1e57b3] text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition duration-200"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin h-5 w-5" />
//             ) : (
//               "Add Item"
//             )}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ItemForm;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer"; // ensure this exists
import {
  FaTag,
  FaAlignLeft,
  FaLayerGroup,
  FaExchangeAlt,
  FaBook,
  FaUniversity,
  FaClipboardCheck,
  FaImage,
} from "react-icons/fa";

const ItemForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    exchangeType: "Donate",
    courseCode: "",
    department: "",
    condition: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        images: formData.imageUrl ? [{ url: formData.imageUrl }] : [],
      };
      delete payload.imageUrl;

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}items`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      toast.success("✅ Item listed successfully!", { id: "item-list-success" });

      setFormData({
        title: "",
        description: "",
        category: "",
        exchangeType: "Donate",
        courseCode: "",
        department: "",
        condition: "",
        imageUrl: "",
      });

      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to list item", {
        id: "item-list-error",
      });
    }
    setLoading(false);
  };

  const renderInput = (
    icon,
    label,
    placeholder,
    name,
    type = "text",
    isTextarea = false
  ) => (
    <div className="w-full space-y-1">
      <label htmlFor={name} className="text-[#212121] font-medium">
        {label}
      </label>
      <div className="relative">
        {React.createElement(icon, {
          className:
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]",
        })}
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            value={formData[name]}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F51B5] resize-none text-[#212121] placeholder-[#757575] bg-white"
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            value={formData[name]}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121] placeholder-[#757575] bg-white"
            required={name !== "imageUrl"}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="flex-grow py-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
        >
          <h2 className="text-3xl font-bold text-[#3F51B5] flex items-center gap-2">
            📦 List a New Item
          </h2>

          {renderInput(FaTag, "Title", "Enter item title", "title")}
          {renderInput(FaAlignLeft, "Description", "Write a short description", "description", "text", true)}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1">
              <label className="text-[#212121] font-medium">Category</label>
              <div className="relative">
                <FaLayerGroup className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
                <select
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121]"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Textbooks">Textbooks</option>
                  <option value="Labkits">Lab Kits</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>
            </div>

            {/* Exchange Type */}
            <div className="space-y-1">
              <label className="text-[#212121] font-medium">Exchange Type</label>
              <div className="relative">
                <FaExchangeAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
                <select
                  name="exchangeType"
                  onChange={handleChange}
                  value={formData.exchangeType}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121]"
                >
                  <option value="Donate">Donate</option>
                  <option value="Swap">Swap</option>
                </select>
              </div>
            </div>
          </div>

          {renderInput(FaBook, "Course Code", "e.g., CS101", "courseCode")}
          {renderInput(FaUniversity, "Department", "Enter department", "department")}

          {/* Condition */}
          <div className="space-y-1">
            <label className="text-[#212121] font-medium">Condition</label>
            <div className="relative">
              <FaClipboardCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
              <select
                name="condition"
                onChange={handleChange}
                value={formData.condition}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3F51B5] text-[#212121]"
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Used">Used</option>
                <option value="Worn">Worn</option>
              </select>
            </div>
          </div>

          {renderInput(FaImage, "Image URL", "Google Drive Image URL", "imageUrl")}

          <button
            type="submit"
            className="w-full bg-[#3F51B5] hover:bg-[#334296] text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition duration-200"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Add Item"
            )}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ItemForm;