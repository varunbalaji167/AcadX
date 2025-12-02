const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

module.exports = router;
