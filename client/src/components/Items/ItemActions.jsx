// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const ItemActions = ({ itemId, ownerId }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     if (!confirm("Delete this item?")) return;
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}items/${itemId}`,
//         {
//           headers: { Authorization: `Bearer ${user.token}` }
//         }
//       );
//       toast.success("Item deleted");
//       navigate("/browse");
//     } catch (err) {
//       toast.error("Could not delete item");
//     }
//   };

//   const handleRequest = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}requests`,
//         { itemId },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       toast.success("Request sent to the item owner!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   const isOwner = user._id === ownerId;

//   return (
//     <div className="flex flex-col gap-3">
//       {isOwner ? (
//         <>
//           <button
//             onClick={handleDelete}
//             className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl shadow"
//           >
//             Delete Item
//           </button>
//         </>
//       ) : (
//         <>
//           <button
//             onClick={handleRequest}
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl shadow"
//           >
//             {loading ? "Sending..." : "Request Swap / Claim"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ItemActions;


import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ItemActions = ({ itemId, ownerId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}items/${itemId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      toast.success("Item deleted");
      navigate("/browse");
    } catch (err) {
      toast.error("Could not delete item");
    }
  };

  const handleRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}requests`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Request sent to the item owner!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const isOwner = user._id === ownerId;

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {isOwner ? (
        <button
          onClick={handleDelete}
          className="bg-[#E53935] hover:bg-[#c62828] text-white font-semibold text-sm px-5 py-2 rounded-lg shadow transition-all duration-200 w-auto"
        >
          Delete Item
        </button>
      ) : (
        <button
          onClick={handleRequest}
          disabled={loading}
          className={`${
            loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#e85b32]'
          } bg-[#FF7043] text-white font-semibold text-sm px-5 py-2 rounded-lg shadow transition-all duration-200 w-auto`}
        >
          {loading ? "Sending..." : "Request Swap / Claim"}
        </button>
      )}
    </div>
  );
};

export default ItemActions;