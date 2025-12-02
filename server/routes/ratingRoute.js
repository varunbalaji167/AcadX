const express = require("express");
const {
  createRating,
  getUserRatings,
} = require("../controllers/ratingController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRating);
router.get("/:userId", getUserRatings);

module.exports = router;
