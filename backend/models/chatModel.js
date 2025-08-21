//chatName
//isGroupChat
//users
//latestMessage
//isGroupAdmin


import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatName: { type: String, required: true, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  isGroupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
