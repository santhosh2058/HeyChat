import Chat from "../models/chatModel.js";
import user from "../models/user.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;

  // TODO: Check if the user is in the chat
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await user.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      try {
        const newChat = await Chat.create(chatData);
        const fullChat = await Chat.findById(newChat._id).populate(
          "users",
          "-password"
        );
        res.status(201).json(fullChat);
      } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const fetchChat = async (req, res) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    const populatedResults = await user.populate(results, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).send(populatedResults);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const createGroupChat = async (req, res) => {
  const { name, users } = req.body;

  if (!name || !users || users.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const groupChat = await Chat.create({
      chatName: name,
      isGroupChat: true,
      users: [...users, req.user._id],
      isGroupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password")
      .populate("latestMessage");

    res.status(201).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const renameGroupChat = async (req, res) => {
  const { chatId, newName } = req.body;

  if (!chatId || !newName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // the name can be updated only by group admin
    const groupAdmin = await Chat.findById(chatId).select("isGroupAdmin");
    if (groupAdmin.isGroupAdmin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group admin can update the name" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName: newName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password")
      .populate("latestMessage");

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const groupChat = await Chat.findById(chatId);
    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }
    // new users can be added only by group admin
    if (groupChat.isGroupAdmin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group admin can add new users" });
    }

    

    // Check if the user is already in the group
    if (groupChat.users.includes(userId)) {
      return res.status(400).json({ message: "User is already in the group" });
    }

    // findAndUpdate

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password")
      .populate("latestMessage");

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};


export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
/*************  ✨ Windsurf Command 🌟  *************/
    const groupChat = await Chat.findById(chatId);
    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }
    // users can be removed only by group admin
    if (groupChat.isGroupAdmin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group admin can remove users" });
    }
/*******  3078f669-da56-41ea-bfb1-a77ec95f1deb  *******/    

    

    // Check if the user is not in the group
    if (!groupChat.users.includes(userId)) {
      return res.status(400).json({ message: "User is not in the group" });
    }

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("isGroupAdmin", "-password")
      .populate("latestMessage");

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};