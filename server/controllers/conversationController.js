// const Conversation = require("../models/conversationModel");
// const Request = require("../models/requestModel");

// const createConversation = async (req, res) => {
//   try {
//     const { requestId } = req.body;
//     const request = await Request.findById(requestId).populate("item requester");
//     if (!request || request.status !== "Accepted") {
//       return res.status(400).json({ success: false, message: "Invalid or unaccepted request" });
//     }

//     // Check if any conversation exists between these two users (regardless of item/request)
//     const existing = await Conversation.findOne({
//       participants: { $all: [request.item.user.toString(), request.requester._id.toString()] },
//     }).populate("participants");

//     if (existing) {
//       const currentUserId = req.user._id.toString(); // assuming you're using auth middleware
//       const otherUser = existing.participants.find(
//         p => p._id.toString() !== currentUserId
//       );

//       return res.status(409).json({
//         success: false,
//         message: "Conversation already exists between these users.",
//         otherUser: {
//           name: otherUser?.name,
//           email: otherUser?.email,
//         },
//       });
//     }

//     const newConversation = new Conversation({
//       participants: [request.item.user, request.requester],
//       request: request._id,
//     });

//     const saved = await newConversation.save();
//     res.status(201).json({ success: true, data: saved });
//   } catch (err) {
//     console.error(" Error creating conversation:", err.message);
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// const getUserConversations = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const conversations = await Conversation.find({ participants: userId })
//       .populate("participants", "name email avatar") // now includes avatar
//       .populate({
//         path: "request",
//         populate: { path: "item", select: "title" },
//       })
//       .populate("lastMessage")
//       .sort({ updatedAt: -1 });

//     console.log("👥 Conversations for user:", userId);
//     res.json({ success: true, data: conversations });
//   } catch (err) {
//     console.error(" Error in getUserConversations:", err.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const getConversationByRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const convo = await Conversation.findOne({ request: requestId });
//     if (!convo) return res.status(404).json({ success: false, message: "Not found" });

//     res.json({ success: true, data: convo });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { createConversation, getUserConversations, getConversationByRequest };

const Conversation = require("../models/conversationModel");
const Request = require("../models/requestModel");
const mongoose = require("mongoose");

const createConversation = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId).populate(
      "item requester"
    );

    if (!request || request.status !== "Accepted") {
      return res.status(400).json({
        success: false,
        message: "Invalid or unaccepted request",
      });
    }

    const userA = request.item.user.toString();
    const userB = request.requester._id.toString();

    // CHECK IF EXACT 1-on-1 CHAT ALREADY EXISTS
    const existing = await Conversation.findOne({
      isGroupChat: false,
      participants: { $all: [userA, userB] },
      $expr: { $eq: [{ $size: "$participants" }, 2] }, // MUST be exactly 2 users
    }).populate("participants");

    if (existing) {
      const currentUserId = req.user._id.toString();
      const otherUser = existing.participants.find(
        (p) => p._id.toString() !== currentUserId
      );

      return res.status(409).json({
        success: false,
        message: "Conversation already exists between these users.",
        chatId: existing._id,
        otherUser: {
          name: otherUser?.name,
          email: otherUser?.email,
          avatar: otherUser?.avatar,
        },
      });
    }

    // CREATE NEW PRIVATE CHAT
    const newConversation = new Conversation({
      participants: [userA, userB],
      request: request._id,
      isGroupChat: false,
    });

    const saved = await newConversation.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("❌ Error creating conversation:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("groupAdmin", "name email avatar")
      .populate({
        path: "request",
        populate: { path: "item", select: "title" },
      })
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.json({ success: true, data: conversations });
  } catch (err) {
    console.error("❌ Error loading conversations:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getConversationByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const convo = await Conversation.findOne({ request: requestId });

    if (!convo) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: convo });
  } catch (err) {
    console.error("❌ Error in getConversationByRequest:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const createGroupChat = async (req, res) => {
  try {
    const { participants, chatName } = req.body;
    const adminId = req.user._id;

    if (!participants || !chatName) {
      return res.status(400).json({
        success: false,
        message: "Please provide chat name and participants.",
      });
    }

    const participantIds = participants.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    if (participantIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Group chat must have at least 3 members.",
      });
    }

    // Add creator/admin if not included
    if (!participantIds.includes(adminId)) {
      participantIds.push(adminId);
    }

    const newGroupChat = new Conversation({
      chatName,
      participants: participantIds,
      isGroupChat: true,
      groupAdmin: adminId,
    });

    const savedChat = await newGroupChat.save();

    const fullGroupChat = await Conversation.findById(savedChat._id)
      .populate("participants", "-password")
      .populate("groupAdmin", "-password");

    res.status(201).json({ success: true, data: fullGroupChat });
  } catch (err) {
    console.error("❌ Error creating group chat:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    const userId = req.user._id;

    const chat = await Conversation.findById(chatId);

    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });

    if (chat.groupAdmin.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the admin can rename the group",
      });
    }

    if (!chatName.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Chat name cannot be empty" });
    }

    chat.chatName = chatName;
    await chat.save();

    res.json({ success: true, data: chat });
  } catch (err) {
    console.error("❌ Error renaming group:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const addRemoveFromGroup = async (req, res) => {
  try {
    const { chatId, userId: targetUserId, action } = req.body;
    const adminId = req.user._id;

    const chat = await Conversation.findById(chatId);

    if (!chat)
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });

    if (!chat.isGroupChat)
      return res.status(400).json({
        success: false,
        message: "Cannot modify participants of private chat.",
      });

    if (chat.groupAdmin.toString() !== adminId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only group admins can modify participants.",
      });
    }

    if (action === "add") {
      if (chat.participants.includes(targetUserId)) {
        return res.status(400).json({
          success: false,
          message: "User already in group.",
        });
      }
      chat.participants.push(targetUserId);
    } else if (action === "remove") {
      if (targetUserId.toString() === adminId.toString()) {
        return res.status(400).json({
          success: false,
          message: "Admin cannot remove themselves.",
        });
      }
      chat.participants.pull(targetUserId);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Use 'add' or 'remove'.",
      });
    }

    await chat.save();

    res.json({
      success: true,
      message: `User ${action}ed successfully.`,
      data: chat,
    });
  } catch (err) {
    console.error("❌ Error modifying group:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createConversation,
  getUserConversations,
  getConversationByRequest,
  createGroupChat,
  renameGroup,
  addRemoveFromGroup,
};
