// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ItemActions from './ItemActions';
// import Navbar from '../Navbar';
// import Footer from '../Footer';
// import { LoaderCircle } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import {
//   FaBoxOpen,
//   FaInfoCircle,
//   FaClipboardCheck,
//   FaBook,
//   FaUserCircle,
//   FaEnvelope,
//   FaGraduationCap,
//   FaIdBadge
// } from 'react-icons/fa';

// const ItemDetail = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);

//   useEffect(() => {
//     const toastId = 'fetch-item';
//     toast.dismiss(toastId);
//     toast.loading('Fetching item details...', { id: toastId });

//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}items/${id}`)
//       .then(({ data }) => {
//         setItem(data.data);
//         toast.success('Item loaded successfully!', { id: toastId });
//       })
//       .catch(() => {
//         toast.error('Failed to fetch item.', { id: toastId });
//       });
//   }, [id]);

//   if (!item) {
//     return (
//       <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <LoaderCircle className="h-10 w-10 text-[#3F51B5] animate-spin" />
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] pb-12">
//         <div className="max-w-4xl mx-auto px-6 py-10">
//           {/* Image */}
//           {item.images?.[0]?.url ? (
//             <img
//               src={item.images[0].url}
//               className="w-full max-h-[24rem] object-contain rounded-2xl shadow-lg border border-gray-200 bg-white"
//               alt={item.title}
//             />
//           ) : (
//             <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-2xl text-gray-400 border border-gray-200">
//               <FaBoxOpen size={50} />
//             </div>
//           )}

//           {/* Title */}
//           <h1 className="text-3xl font-bold mt-8 mb-2 flex items-center gap-2 text-[#212121]">
//             <FaInfoCircle className="text-[#3F51B5]" />
//             {item.title}
//           </h1>

//           {/* Description */}
//           <p className="text-base text-[#757575] mb-6 border-l-4 border-[#81C784] pl-4 py-2 bg-white rounded-md shadow-sm">
//             {item.description}
//           </p>

//           {/* Metadata */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#212121]">
//             <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//               <FaClipboardCheck className="text-[#43A047]" />
//               <span>
//                 <span className="text-[#757575]">Condition:</span> <strong>{item.condition}</strong>
//               </span>
//             </div>

//             <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//               <FaBook className="text-[#81C784]" />
//               <span>
//                 <span className="text-[#757575]">Course Code:</span> <strong>{item.courseCode}</strong>
//               </span>
//             </div>
//           </div>

//           {/* Owner */}
//           {item.user && (
//             <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
//               <h3 className="text-lg font-semibold text-[#212121] mb-4 flex items-center gap-2">
//                 <FaUserCircle className="text-[#FF7043]" />
//                 Owner Information
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-3 text-sm text-[#212121]">
//                 <div className="flex items-center gap-2">
//                   <FaUserCircle className="text-[#3F51B5]" />
//                   Name: {item.user.name || 'Anonymous'}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaEnvelope className="text-[#43A047]" />
//                   Email: {item.user.email}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaIdBadge className="text-[#3F51B5]" />
//                   Roll No: {item.user.rollNo}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FaGraduationCap className="text-[#81C784]" />
//                   {item.user.degree} in {item.user.major}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="mt-10">
//             <ItemActions itemId={id} ownerId={item.user?._id} />
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default ItemDetail;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ItemActions from "./ItemActions";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  FaBoxOpen,
  FaInfoCircle,
  FaClipboardCheck,
  FaBook,
  FaUserCircle,
  FaEnvelope,
  FaGraduationCap,
  FaIdBadge,
  FaListUl,
  FaCamera,
  FaEye,
} from "react-icons/fa";

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);

  const [newVersionUrl, setNewVersionUrl] = useState("");
  const [changeLog, setChangeLog] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}items/${id}`)
      .then(({ data }) => {
        setItem(data.data);
      })
      .catch(() => {
        toast.error("Failed to load item details");
      });
  };

  const handleAddUpdate = async (e) => {
    e.preventDefault();

    if (!changeLog.trim()) {
      toast.error("Please explain what changed");
      return;
    }

    if (!user || !user.token) {
      toast.error("You must be logged in.");
      return;
    }

    setIsUploading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}items/${id}/versions`,
        { url: newVersionUrl, changeLog },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setNewVersionUrl("");
      setChangeLog("");
      fetchItem();
      toast.success("Item updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add update");
    } finally {
      setIsUploading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <LoaderCircle className="h-10 w-10 text-[#3F51B5] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  const currentUserId =
    user?.user?._id || user?._id || user?.user?.id || user?.id || null;
  const itemOwnerId = item?.user?._id || item?.user?.id || null;

  const isOwner =
    currentUserId &&
    itemOwnerId &&
    String(currentUserId).trim() === String(itemOwnerId).trim();

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] pb-12">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Item Image */}
          {item.images?.[0]?.url ? (
            <img
              src={item.images[0].url}
              className="w-full max-h-[24rem] object-contain rounded-2xl shadow-lg border border-gray-200 bg-white"
              alt={item.title}
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-2xl text-gray-400 border border-gray-200">
              <FaBoxOpen size={50} />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold mt-8 mb-2 flex items-center gap-2 text-[#212121]">
            <FaInfoCircle className="text-[#3F51B5]" />
            {item.title}
          </h1>

          {/* Description */}
          <p className="text-base text-[#757575] mb-6 border-l-4 border-[#81C784] pl-4 py-2 bg-white rounded-md shadow-sm">
            {item.description}
          </p>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#212121]">
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <FaClipboardCheck className="text-[#43A047]" />
              <span>
                <span className="text-[#757575]">Condition:</span>{" "}
                <strong>{item.condition}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <FaBook className="text-[#81C784]" />
              <span>
                <span className="text-[#757575]">Course Code:</span>{" "}
                <strong>{item.courseCode}</strong>
              </span>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold text-[#333333] flex items-center gap-2 mb-4">
              <FaListUl className="text-[#2A6FDB]" /> Item Updates & Notes
            </h3>

            <div className="space-y-4">
              {item.versions?.length > 0 ? (
                item.versions.map((ver, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-50 p-4 rounded-lg border-l-4 border-[#2A6FDB]"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-[#333333]">
                        {ver.changeLog}
                      </span>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {new Date(ver.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {ver.url && (
                      <div className="mt-2">
                        <a
                          href={ver.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 text-[#2A6FDB] transition"
                        >
                          <FaEye /> View Attached Image
                        </a>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No updates added by owner yet.
                </p>
              )}
            </div>

            {isOwner && (
              <div className="mt-6 bg-[#F0F9FF] p-4 rounded-lg border border-[#BAE6FD]">
                <h4 className="font-semibold text-[#0C4A6E] mb-2 flex items-center gap-2">
                  <FaCamera /> Post an Update
                </h4>

                <form
                  onSubmit={handleAddUpdate}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Details about your update"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#2A6FDB]"
                    value={changeLog}
                    onChange={(e) => setChangeLog(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Image URL (optional)"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#2A6FDB]"
                    value={newVersionUrl}
                    onChange={(e) => setNewVersionUrl(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`bg-[#2A6FDB] text-white py-2 rounded transition font-semibold ${
                      isUploading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {isUploading ? "Posting..." : "Post Update"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Owner Info */}
          {item.user && (
            <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-[#212121] mb-4 flex items-center gap-2">
                <FaUserCircle className="text-[#FF7043]" />
                Owner Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-[#212121]">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-[#3F51B5]" />
                  Name: {item.user.name || "Anonymous"}
                </div>

                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#43A047]" />
                  Email: {item.user.email}
                </div>

                <div className="flex items-center gap-2">
                  <FaIdBadge className="text-[#3F51B5]" />
                  Roll No: {item.user.rollNo}
                </div>

                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-[#81C784]" />
                  {item.user.degree} in {item.user.major}
                </div>
              </div>
            </div>
          )}

          {/* Item Actions */}
          <div className="mt-10">
            <ItemActions itemId={id} ownerId={item.user?._id} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ItemDetail;
