const express = require("express");
const router = express.Router();
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  toggleUserBan,
  getAllItems,
  deleteItemByAdmin,
} = require("../controllers/adminController");

// Must be logged in AND an admin
router.use(authMiddleware);
router.use(adminOnly);

// Dashboard Analytics
router.get("/stats", getDashboardStats);

// User Management
router.get("/users", getAllUsers);
router.put("/users/:id/ban", toggleUserBan);

// Item Moderation
router.get("/items", getAllItems);
router.delete("/items/:id", deleteItemByAdmin);

module.exports = router;
