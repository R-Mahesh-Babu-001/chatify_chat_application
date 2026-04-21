import mongoose from "mongoose";

const websiteChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    websiteUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },
    favicon: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

websiteChatSchema.index({ userId: 1, websiteUrl: 1 }, { unique: true });

const WebsiteChat = mongoose.model("WebsiteChat", websiteChatSchema);

export default WebsiteChat;
