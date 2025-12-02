const User = require("../models/userModel");
const Item = require("../models/itemModel");
const Request = require("../models/requestModel");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    const totalRequests = await Request.countDocuments();

    const pendingRequests = await Request.countDocuments({ status: "Pending" });

    res.status(200).json({
      success: true,
      data: { totalUsers, totalItems, totalRequests, pendingRequests },
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const toggleUserBan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot ban an admin." });
    }

    user.status = user.status === "Active" ? "Banned" : "Active";
    await user.save();

    res.status(200).json({
      success: true,
      message: `User is now ${user.status}`,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Item.countDocuments();

    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteItemByAdmin = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Item removed by Admin" });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  toggleUserBan,
  getAllItems,
  deleteItemByAdmin,
};
