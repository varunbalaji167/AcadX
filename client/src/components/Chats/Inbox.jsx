// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// import ChatWindow from "./ChatWindow";
// import toast from "react-hot-toast";
// import { LoaderCircle } from "lucide-react";
// import { FaInbox, FaUserCircle, FaArrowLeft } from "react-icons/fa";
// import Navbar from "../Navbar";

// const Inbox = () => {
//   const { user } = useAuth();
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchConversations = async () => {
//       if (!user?.token || !user?.user?._id) return;

//       setLoading(true);
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}conversations`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });

//         const rawConversations = res.data?.data || [];

//         const processed = rawConversations.map((conv) => {
//           const otherUser = conv.participants.find((p) => p._id !== user.user._id);
//           return {
//             ...conv,
//             otherUserName: otherUser?.name || "Unknown",
//             avatar: otherUser?.avatar || null,
//           };
//         });

//         setConversations(processed);
//       } catch (err) {
//         if (!toast.isActive("conv-error")) {
//           toast.error("📭 Failed to load conversations", { id: "conv-error" });
//         }
//         console.error(" Error fetching conversations:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConversations();
//   }, [user]);

//   const handleSelectConversation = (conv) => {
//     setSelectedConversation(conv);
//   };

//   const handleBack = () => {
//     setSelectedConversation(null);
//   };

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
//       <Navbar />

//       <div className="flex flex-col md:flex-row flex-grow h-[calc(100vh-80px)]">
//         {/* Sidebar */}
//         <div
//           className={`w-full md:w-1/3 border-r overflow-y-auto transition-all duration-300 ease-in-out ${
//             selectedConversation ? "hidden md:block" : "block"
//           }`}
//         >
//           <div className="sticky top-0 z-10 bg-[#3F51B5] text-white px-5 py-4 flex items-center justify-between shadow-md">
//             <h2 className="text-xl font-semibold flex items-center gap-2">
//               <FaInbox className="text-white" />
//               Inbox
//             </h2>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center py-16 text-[#3F51B5]">
//               <LoaderCircle className="animate-spin" size={28} />
//             </div>
//           ) : conversations.length === 0 ? (
//             <p className="text-sm text-center text-[#757575] mt-10">No conversations yet</p>
//           ) : (
//             <div className="space-y-1 px-3 py-4">
//               {conversations.map((conv) => (
//                 <div
//                   key={conv._id}
//                   onClick={() => handleSelectConversation(conv)}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer shadow-sm transition ${
//                     selectedConversation?._id === conv._id
//                       ? "bg-[#E8F0FE] border-l-4 border-[#3F51B5]"
//                       : "hover:bg-[#FFE9E6]"
//                   }`}
//                 >
//                   {conv.avatar ? (
//                     <img
//                       src={conv.avatar}
//                       alt="Avatar"
//                       className="w-10 h-10 rounded-full object-cover border-2 border-[#3F51B5]"
//                     />
//                   ) : (
//                     <FaUserCircle className="text-[#3F51B5] text-3xl" />
//                   )}
//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-[#212121] truncate">{conv.otherUserName}</p>
//                     <p className="text-sm text-[#757575] truncate">
//                       {conv.lastMessage?.text || "No messages yet"}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Chat Window */}
//         <div
//           className={`w-full md:w-2/3 bg-white h-full transition-all duration-300 ease-in-out ${
//             !selectedConversation ? "hidden md:flex" : "flex flex-col"
//           }`}
//         >
//           {selectedConversation ? (
//             <>
//               <div className="md:hidden flex items-center gap-4 px-5 py-4 bg-[#3F51B5] text-white shadow-md">
//                 <button onClick={handleBack}>
//                   <FaArrowLeft size={20} />
//                 </button>
//                 <h2 className="text-lg font-semibold truncate">{selectedConversation.otherUserName}</h2>
//               </div>

//               <div className="flex-1 overflow-hidden">
//                 <ChatWindow
//                   conversation={selectedConversation}
//                   currentUser={{ ...user.user, token: user.token }}
//                 />
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center px-6 text-center text-[#757575]">
//               <FaInbox size={40} className="mb-4 text-[#3F51B5]" />
//               <p className="text-xl font-medium">Select a conversation to start chatting</p>
//               <p className="text-sm mt-1 text-gray-500">Your messages will appear here</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inbox;

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import ChatWindow from "./ChatWindow";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import {
  FaInbox,
  FaUserCircle,
  FaArrowLeft,
  FaUsers,
  FaPlus,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Inbox = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [availableContacts, setAvailableContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user?.token || !user?.user?._id) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}conversations`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const raw = res.data?.data || [];
        const contactsMap = new Map();

        const processed = raw.map((conv) => {
          // 🔵 GROUP CHAT
          if (conv.isGroupChat) {
            return {
              ...conv,
              isGroupChat: true,
              displayName: conv.chatName,
              avatar: null, // group chats have icon
              isDirect: false,
            };
          }

          // 🟢 DIRECT CHAT - restore avatar + name
          const otherUser = conv.participants.find(
            (p) => p._id !== user.user._id
          );

          if (otherUser) contactsMap.set(otherUser._id, otherUser);

          return {
            ...conv,
            isGroupChat: false,
            isDirect: true,
            displayName: otherUser?.name || "Unknown",
            avatar: otherUser?.avatar || null,
          };
        });

        setConversations(processed);
        setAvailableContacts(Array.from(contactsMap.values()));
      } catch (err) {
        toast.error("📭 Failed to load conversations");
        console.error("Conversation load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  const handleSelectConversation = (c) => setSelectedConversation(c);
  const handleBack = () => setSelectedConversation(null);

  const toggleContactSelection = (id) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return toast.error("Please name your group");
    if (selectedContactIds.length < 2)
      return toast.error("Select at least 2 members");

    setCreatingGroup(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}conversations/group`,
        {
          chatName: groupName,
          participants: selectedContactIds,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success("Group created!");
      setShowGroupModal(false);
      setGroupName("");
      setSelectedContactIds([]);
      window.location.reload();
    } catch (err) {
      toast.error("Failed: " + (err.response?.data?.message || ""));
    } finally {
      setCreatingGroup(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <Navbar />

      {/* GROUP MODAL */}
      {showGroupModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#2A6FDB] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FaUsers /> Create Discussion Group
              </h3>
              <button onClick={() => setShowGroupModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="font-medium text-sm">Group Name</label>
                <input
                  className="w-full border p-2 rounded-lg mt-1"
                  placeholder="e.g. Lab Group"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>

              <div>
                <label className="font-medium text-sm">
                  Select Members ({selectedContactIds.length})
                </label>
                <div className="h-48 overflow-y-auto border mt-1 rounded-lg p-2 bg-gray-50">
                  {availableContacts.length ? (
                    availableContacts.map((u) => (
                      <div
                        key={u._id}
                        onClick={() => toggleContactSelection(u._id)}
                        className={`flex items-center gap-3 p-2 cursor-pointer rounded-md ${
                          selectedContactIds.includes(u._id)
                            ? "bg-blue-100 border border-blue-300"
                            : "hover:bg-white"
                        }`}
                      >
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <FaUserCircle className="text-gray-400 text-2xl" />
                        )}
                        <span className="flex-1">{u.name}</span>
                        {selectedContactIds.includes(u._id) && (
                          <FaCheckCircle className="text-[#2A6FDB]" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 pt-6">
                      No contacts available
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleCreateGroup}
                disabled={creatingGroup}
                className="w-full bg-[#2A6FDB] text-white py-2 rounded-lg font-semibold"
              >
                {creatingGroup ? "Creating..." : "Create Group"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT */}
      <div className="flex flex-col md:flex-row flex-grow h-[calc(100vh-80px)]">
        {/* SIDEBAR */}
        <div
          className={`w-full md:w-1/3 border-r overflow-y-auto ${
            selectedConversation ? "hidden md:block" : ""
          }`}
        >
          <div className="sticky top-0 bg-[#3F51B5] text-white px-5 py-4 shadow-md flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaInbox /> Inbox
            </h2>

            <button
              onClick={() => setShowGroupModal(true)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              <FaPlus size={16} />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <LoaderCircle className="animate-spin text-[#3F51B5]" size={28} />
            </div>
          ) : conversations.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">No conversations</p>
          ) : (
            <div className="p-3 space-y-2">
              {conversations.map((c) => (
                <div
                  key={c._id}
                  onClick={() => handleSelectConversation(c)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer shadow-sm transition ${
                    selectedConversation?._id === c._id
                      ? "bg-[#E8F0FE] border-l-4 border-[#3F51B5]"
                      : "hover:bg-[#FFE9E6]"
                  }`}
                >
                  {/* Avatar */}
                  {c.isGroupChat ? (
                    <FaUsers className="text-[#2A6FDB] text-3xl" />
                  ) : c.avatar ? (
                    <img
                      src={c.avatar}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#3F51B5]"
                    />
                  ) : (
                    <FaUserCircle className="text-[#3F51B5] text-3xl" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-[#212121]">
                      {c.displayName}
                    </p>
                    <p className="text-sm truncate text-gray-500">
                      {c.lastMessage?.text || "No messages yet"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CHAT WINDOW */}
        <div
          className={`w-full md:w-2/3 bg-white ${
            !selectedConversation ? "hidden md:flex" : "flex"
          } flex-col`}
        >
          {selectedConversation ? (
            <>
              <div className="md:hidden bg-[#3F51B5] text-white px-5 py-4 flex items-center gap-4">
                <button onClick={handleBack}>
                  <FaArrowLeft size={20} />
                </button>
                <span className="text-lg font-semibold truncate">
                  {selectedConversation.displayName}
                </span>
              </div>

              <div className="flex-1 overflow-hidden">
                <ChatWindow
                  conversation={selectedConversation}
                  currentUser={{ ...user.user, token: user.token }}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
              <FaInbox className="text-[#3F51B5] mb-4" size={40} />
              <p>Select a conversation to start chatting</p>
              <p className="text-sm mt-1">Or create a new group chat</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Inbox;
