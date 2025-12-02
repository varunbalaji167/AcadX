// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const {
//   createConversation,
//   getUserConversations,
//   getConversationByRequest,
// } = require("../controllers/conversationController");

// router.post("/", auth, createConversation);
// router.get("/", auth, getUserConversations);
// router.get("/request/:requestId", auth, getConversationByRequest);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createConversation,
  getUserConversations,
  getConversationByRequest,
  createGroupChat,
  renameGroup,
  addRemoveFromGroup,
} = require("../controllers/conversationController");

// (1-on-1 Swap Chats)
router.post("/", authMiddleware, createConversation);
router.get("/", authMiddleware, getUserConversations);
router.get("/request/:requestId", authMiddleware, getConversationByRequest);

// (Group Chats / Forums)
router.post("/group", authMiddleware, createGroupChat);
router.put("/rename", authMiddleware, renameGroup);
router.put("/groupaddremove", authMiddleware, addRemoveFromGroup);

module.exports = router;
