// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import RatingModal from './RatingModal';
// import { toast } from 'react-hot-toast';

// const Requests = () => {
//   const { user } = useAuth();
//   const [incoming, setIncoming] = useState([]);
//   const [outgoing, setOutgoing] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   const fetchRequests = async () => {
//     const headers = { Authorization: `Bearer ${user.token}` };
//     const [inRes, outRes] = await Promise.all([
//       axios.get(`${import.meta.env.VITE_API_BASE_URL}requests/incoming`, { headers }),
//       axios.get(`${import.meta.env.VITE_API_BASE_URL}requests/outgoing`, { headers }),
//     ]);
//     setIncoming(inRes.data.data);
//     setOutgoing(outRes.data.data);
//   };

//   const updateStatus = async (requestId, status) => {
//     const headers = { Authorization: `Bearer ${user.token}` };

//     try {
//       // 1. Update request status
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}requests/${requestId}`,
//         { status },
//         { headers }
//       );
//       toast.success(`Request ${status}`);

//       // 2. If accepted, try to create conversation
//       if (status === "Accepted") {
//         try {
//           const convRes = await axios.post(
//             `${import.meta.env.VITE_API_BASE_URL}conversations`,
//             { requestId },
//             { headers }
//           );
//           toast.success("Chat started! Check your inbox.");
//         } catch (err) {
//           if (err.response?.status === 409) {
//             const otherUser = err.response.data?.otherUser;
//             const displayName = otherUser?.name || otherUser?.email || "this user";
//             toast(`💬 Chat already exists with ${displayName}`);
//           } else {
//             toast.error("Something went wrong while starting chat.");
//           }
//         }
//       }

//       // 3. Refresh request lists
//       fetchRequests();
//     } catch (err) {
//       console.error("Request status update error:", err);
//       toast.error("Failed to update request status.");
//     }
//   };

//   const handleReviewSubmit = async (reviewData) => {
//     await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}ratings`,
//       reviewData,
//       { headers: { Authorization: `Bearer ${user.token}` } }
//     );
//     setSelectedRequest(null);
//     fetchRequests();
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   return (
//     <div className="mt-6 space-y-8">
//       {/* Incoming Requests */}
//       <div className="p-4 border rounded-xl shadow bg-white">
//         <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
//         {incoming.length === 0 ? (
//           <p className="text-gray-500">No incoming requests.</p>
//         ) : (
//           incoming.map((req) => (
//             <div key={req._id} className="border-b py-3">
//               <p><strong>Item:</strong> {req.item.title}</p>
//               <p><strong>From:</strong> {req.requester.email}</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               {req.status === "Pending" && (
//                 <div className="mt-2 flex gap-2">
//                   <button
//                     onClick={() => updateStatus(req._id, "Accepted")}
//                     className="bg-green-600 text-white px-4 py-1 rounded"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => updateStatus(req._id, "Rejected")}
//                     className="bg-red-600 text-white px-4 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Outgoing Requests */}
//       <div className="p-4 border rounded-xl shadow bg-white">
//         <h2 className="text-xl font-semibold mb-4">Your Sent Requests</h2>
//         {outgoing.length === 0 ? (
//           <p className="text-gray-500">You haven't sent any requests.</p>
//         ) : (
//           outgoing.map((req) => (
//             <div key={req._id} className="border-b py-3">
//               <p><strong>Item:</strong> {req.item.title}</p>
//               <p><strong>To:</strong> {req.item.user?.email || "Unknown"}</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               {req.status === "Accepted" && (
//                 <p><strong>Accepted By:</strong> {req.item.user?.email || "Unknown"}</p>
//               )}
//               {req.status === "Accepted" && !req.rated && (
//                 <button
//                   className="mt-2 text-sm bg-yellow-500 text-white px-3 py-1 rounded"
//                   onClick={() => setSelectedRequest(req)}
//                 >
//                   Leave a Review
//                 </button>
//               )}
//               {req.status === "Accepted" && req.rated && (
//                 <p className="text-green-600 text-sm mt-2">✅ Review Submitted</p>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Rating Modal */}
//       {selectedRequest && (
//         <RatingModal
//           isOpen={!!selectedRequest}
//           onClose={() => setSelectedRequest(null)}
//           onSubmit={handleReviewSubmit}
//           request={selectedRequest}
//         />
//       )}
//     </div>
//   );
// };

// export default Requests;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import RatingModal from "./RatingModal";
import { toast } from "react-hot-toast";
import {
  FaInbox,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaUserCheck,
  FaUserAlt,
  FaCube,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";

const Requests = () => {
  const { user } = useAuth();
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const [incomingPage, setIncomingPage] = useState(1);
  const [outgoingPage, setOutgoingPage] = useState(1);
  const pageSize = 5;

  const paginatedIncoming = incoming.slice(
    (incomingPage - 1) * pageSize,
    incomingPage * pageSize
  );
  const paginatedOutgoing = outgoing.slice(
    (outgoingPage - 1) * pageSize,
    outgoingPage * pageSize
  );

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${user.token}` };
      const [inRes, outRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}requests/incoming`, {
          headers,
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}requests/outgoing`, {
          headers,
        }),
      ]);
      setIncoming(inRes.data.data);
      setOutgoing(outRes.data.data);
    } catch (err) {
      toast.error("Failed to fetch requests.", { id: "fetch_error" });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (requestId, status) => {
    const headers = { Authorization: `Bearer ${user.token}` };
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}requests/${requestId}`,
        { status },
        { headers }
      );
      toast.success(`Request ${status}`, {
        id: `request_${status}_${requestId}`,
      });

      if (status === "Accepted") {
        try {
          const convRes = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}conversations`,
            { requestId },
            { headers }
          );
          toast.success("Chat started! Check your inbox.", {
            id: `chat_started_${requestId}`,
          });
        } catch (err) {
          if (err.response?.status === 409) {
            const otherUser = err.response.data?.otherUser;
            const displayName =
              otherUser?.name || otherUser?.email || "this user";
            toast(`💬 Chat already exists with ${displayName}`, {
              id: `chat_exists_${requestId}`,
            });
          } else {
            toast.error("Something went wrong while starting chat.", {
              id: `chat_error_${requestId}`,
            });
          }
        }
      }

      fetchRequests();
    } catch (err) {
      console.error("Request status update error:", err);
      toast.error("Failed to update request status.", {
        id: "status_update_error",
      });
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}ratings`,
        reviewData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Review submitted!", {
        id: `review_success_${reviewData.request}`,
      });
      setSelectedRequest(null);
      fetchRequests();
    } catch {
      toast.error("Failed to submit review.", {
        id: `review_error_${reviewData.request}`,
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen mt-10 pb-20 px-4 max-w-4xl mx-auto space-y-10">
      {/* Incoming Requests */}
      <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-[#3F51B5] mb-4 flex items-center gap-2">
          <FaInbox /> Incoming Requests
        </h2>
        {loading ? (
          <div className="text-center text-[#757575]">
            <Loader2 className="mx-auto animate-spin" size={28} />
          </div>
        ) : paginatedIncoming.length === 0 ? (
          <p className="text-[#757575]">No incoming requests.</p>
        ) : (
          paginatedIncoming.map((req) => (
            <div key={req._id} className="border-b last:border-b-0 py-4">
              <p className="text-[#212121] flex items-center gap-2">
                <FaCube className="text-[#3F51B5]" /> <strong>Item:</strong>{" "}
                {req.item.title}
              </p>
              <p className="text-[#212121] flex items-center gap-2">
                <FaUserAlt className="text-[#3F51B5]" />
                <strong>From:</strong>
                {req.requester.name
                  ? `${req.requester.name} (${req.requester.email})`
                  : req.requester.email}
              </p>
              {req.item.user && (
                <p className="text-[#212121] flex items-center gap-2">
                  <FaUserCheck className="text-[#3F51B5]" />{" "}
                  <strong>Owner:</strong>{" "}
                  {req.item.user.name || req.item.user.email || "Unknown"} (You)
                </p>
              )}
              {req.status === "Accepted" && (
                <div className="mt-2 text-[#3F51B5] flex items-center gap-2">
                  <FaUserCheck /> Accepted by: You (
                  {req.item.user?.email || "Unknown"})
                </div>
              )}
              {req.status === "Rejected" && (
                <div className="mt-2 text-[#E53935] flex items-center gap-2">
                  <FaTimesCircle /> Rejected by: You
                </div>
              )}
              {req.status === "Pending" && (
                <>
                  <p className="text-[#757575]">
                    <strong>Status:</strong> Pending
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => updateStatus(req._id, "Accepted")}
                      className="bg-[#43A047] hover:bg-[#388E3C] text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <FaCheckCircle /> Accept
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "Rejected")}
                      className="bg-[#E53935] hover:bg-[#C62828] text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}

        {incoming.length > pageSize && (
          <div className="mt-4 flex justify-end gap-4 items-center">
            <button
              onClick={() => setIncomingPage((prev) => Math.max(prev - 1, 1))}
              disabled={incomingPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {incomingPage} of {Math.ceil(incoming.length / pageSize)}
            </span>
            <button
              onClick={() =>
                setIncomingPage((prev) =>
                  prev < Math.ceil(incoming.length / pageSize)
                    ? prev + 1
                    : prev
                )
              }
              disabled={incomingPage === Math.ceil(incoming.length / pageSize)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Outgoing Requests */}
      <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-[#3F51B5] mb-4 flex items-center gap-2">
          <FaPaperPlane /> Your Sent Requests
        </h2>
        {loading ? (
          <div className="text-center text-[#757575]">
            <Loader2 className="mx-auto animate-spin" size={28} />
          </div>
        ) : paginatedOutgoing.length === 0 ? (
          <p className="text-[#757575]">You haven't sent any requests.</p>
        ) : (
          paginatedOutgoing.map((req) => (
            <div key={req._id} className="border-b last:border-b-0 py-4">
              <p className="text-[#3F51B5] flex items-center gap-2">
                <FaCube /> <strong>Item:</strong> {req.item.title}
              </p>
              <p className="text-[#3F51B5] flex items-center gap-2">
                <FaUserCheck /> <strong>Owner:</strong>{" "}
                {req.item.user?.name || req.item.user?.email || "Unknown"}
              </p>
              <p className="text-[#3F51B5]">
                <strong>To:</strong> {req.item.user?.email || "Unknown"}
              </p>
              {req.status === "Accepted" && (
                <div className="mt-2 text-[#3F51B5] flex items-center gap-2">
                  <FaUserCheck /> Accepted by:{" "}
                  {req.item.user?.email || "Unknown"}
                </div>
              )}
              {req.status === "Rejected" && (
                <div className="mt-2 text-[#E53935] flex items-center gap-2">
                  <FaTimesCircle /> Rejected by:{" "}
                  {req.item.user?.email || "Unknown"}
                </div>
              )}
              {req.status === "Pending" && (
                <p className="text-[#757575]">
                  <strong>Status:</strong> Pending
                </p>
              )}
              {req.status === "Accepted" && !req.rated && (
                <button
                  onClick={() => setSelectedRequest(req)}
                  className="mt-3 bg-[#FFD600] hover:bg-yellow-400 text-[#212121] px-4 py-2 rounded-md flex items-center gap-2 text-sm"
                >
                  <FaStar /> Leave a Review
                </button>
              )}
              {req.status === "Accepted" && req.rated && (
                <p className="mt-3 text-[#43A047] flex items-center gap-2 text-sm">
                  <FaCheckCircle /> Review Submitted
                </p>
              )}
            </div>
          ))
        )}

        {outgoing.length > pageSize && (
          <div className="mt-4 flex justify-end gap-4 items-center">
            <button
              onClick={() => setOutgoingPage((prev) => Math.max(prev - 1, 1))}
              disabled={outgoingPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {outgoingPage} of {Math.ceil(outgoing.length / pageSize)}
            </span>
            <button
              onClick={() =>
                setOutgoingPage((prev) =>
                  prev < Math.ceil(outgoing.length / pageSize)
                    ? prev + 1
                    : prev
                )
              }
              disabled={outgoingPage === Math.ceil(outgoing.length / pageSize)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Rating Modal */}
      {selectedRequest && (
        <RatingModal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSubmit={handleReviewSubmit}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default Requests;