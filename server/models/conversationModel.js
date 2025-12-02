// const mongoose = require("mongoose");

// const conversationSchema = new mongoose.Schema(
//   {
//     participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
//     request: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true, unique: true },
//     lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Conversation", conversationSchema);

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    chatName: { type: String, trim: true },

    isGroupChat: { type: Boolean, default: false },

    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Request ONLY for 1-on-1 chat (should NOT be unique for null)
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      default: null,
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

conversationSchema.index(
  { request: 1 },
  {
    unique: true,
    partialFilterExpression: {
      request: { $exists: true, $ne: null },
    },
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
