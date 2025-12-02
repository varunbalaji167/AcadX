const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  deleteItem,
  addItemVersion,
} = require("../controllers/itemController");

const { authMiddleware } = require("../middleware/authMiddleware");
router.post("/", authMiddleware, createItem);

router.get("/", getItems);
router.get("/:id", getItemById);

router.delete("/:id", authMiddleware, deleteItem);

router.post("/:id/versions", authMiddleware, addItemVersion);

module.exports = router;
