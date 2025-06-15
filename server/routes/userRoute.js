const express = require("express");
const router = express.Router();
const { register, login, getMyProfile, updateMyProfile, getUserPublicProfile } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Profile-related
router.get("/me",auth, getMyProfile);
router.get("/:id", getUserPublicProfile);
router.put("/me", auth, updateMyProfile);

module.exports = router;
