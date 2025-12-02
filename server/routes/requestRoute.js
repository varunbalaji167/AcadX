const express = require("express");
const {
  createRequest,
  getIncomingRequests,
  updateRequestStatus,
  getOutgoingRequests,
} = require("../controllers/requestController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRequest);
router.get("/incoming", authMiddleware, getIncomingRequests);
router.get("/outgoing", authMiddleware, getOutgoingRequests);
router.put("/:requestId", authMiddleware, updateRequestStatus);

module.exports = router;
