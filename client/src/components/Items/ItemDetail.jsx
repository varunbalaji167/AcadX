// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ItemActions from './ItemActions';
// import Navbar from "../Navbar";
// import { LoaderCircle } from 'lucide-react';
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
//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}items/${id}`)
//       .then(({ data }) => {
//         console.log("Item Detail Response:", data);
//         setItem(data.data);
//       });
//   }, [id]);

//   if (!item) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <LoaderCircle className="h-10 w-10 text-blue-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-4">
//         {/* Image */}
//         {item.images?.[0]?.url ? (
//           <img
//             src={item.images[0].url}
//             className="w-full max-h-96 object-contain rounded-xl shadow"
//             alt={item.title}
//           />
//         ) : (
//           <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
//             <FaBoxOpen size={50} />
//           </div>
//         )}

//         {/* Title */}
//         <h1 className="text-3xl font-bold mt-6 flex items-center gap-2 text-gray-800">
//           <FaInfoCircle className="text-blue-500" />
//           {item.title}
//         </h1>

//         {/* Description */}
//         <p className="mt-2 text-gray-700">{item.description}</p>

//         {/* Condition */}
//         <p className="mt-4 text-sm text-gray-600 flex items-center gap-2">
//           <FaClipboardCheck className="text-green-600" />
//           Condition: {item.condition}
//         </p>

//         {/* Course */}
//         <p className="mt-1 text-sm text-gray-600 flex items-center gap-2">
//           <FaBook className="text-purple-500" />
//           Course Code: {item.courseCode}
//         </p>

//         {/* Owner */}
//         {item.user && (
//           <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <FaUserCircle className="text-orange-500" /> Owner Information
//             </h3>
//             <p className="text-sm text-gray-700 flex items-center gap-2">
//               <FaUserCircle className="text-blue-500" /> Name: {item.user.name || 'Anonymous'}
//             </p>
//             <p className="text-sm text-gray-700 flex items-center gap-2">
//               <FaEnvelope className="text-green-500" /> Email: {item.user.email}
//             </p>
//             <p className="text-sm text-gray-700 flex items-center gap-2">
//               <FaIdBadge className="text-indigo-500" /> Roll No: {item.user.rollNo}
//             </p>
//             <p className="text-sm text-gray-700 flex items-center gap-2">
//               <FaGraduationCap className="text-purple-500" /> {item.user.degree} in {item.user.major}
//             </p>
//           </div>
//         )}

//         {/* Actions */}
//         <div className="mt-6">
//           <ItemActions itemId={id} ownerId={item.user?._id} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ItemDetail;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemActions from './ItemActions';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  FaBoxOpen,
  FaInfoCircle,
  FaClipboardCheck,
  FaBook,
  FaUserCircle,
  FaEnvelope,
  FaGraduationCap,
  FaIdBadge
} from 'react-icons/fa';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const toastId = 'fetch-item';
    toast.dismiss(toastId);
    toast.loading('Fetching item details...', { id: toastId });

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}items/${id}`)
      .then(({ data }) => {
        setItem(data.data);
        toast.success('Item loaded successfully!', { id: toastId });
      })
      .catch(() => {
        toast.error('Failed to fetch item.', { id: toastId });
      });
  }, [id]);

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

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] pb-12">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Image */}
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
                <span className="text-[#757575]">Condition:</span> <strong>{item.condition}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <FaBook className="text-[#81C784]" />
              <span>
                <span className="text-[#757575]">Course Code:</span> <strong>{item.courseCode}</strong>
              </span>
            </div>
          </div>

          {/* Owner */}
          {item.user && (
            <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-[#212121] mb-4 flex items-center gap-2">
                <FaUserCircle className="text-[#FF7043]" />
                Owner Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-[#212121]">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-[#3F51B5]" />
                  Name: {item.user.name || 'Anonymous'}
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

          {/* Actions */}
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