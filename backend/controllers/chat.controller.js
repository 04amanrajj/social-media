//chat.controller.js
const db = require("../config/db");
const { getIO } = require("../config/socket");

exports.getChats = async (req, res) => {
  try {
    const userId = req.userId;
    const { roomId } = req.query;
    if (roomId) {
      const chats = await db("chats").where({ room_id: roomId }).select("*");
      return res.status(200).json({ chats });
    }
    //fetch all chats where user is either sender or receiver
    const chats = await db("chats")
      .where({ user_id: userId })
      .select("*");
    res.status(200).json({ chats });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { roomId, senderId,receiverId, message } = req.body;
    if (!roomId || !senderId || !message) {
      return res
        .status(400)
        .json({ message: "roomId, senderId and message are required" });
    }
    const [chat] = await db("chats")
      .insert({
        room_id: roomId,
        user_id: userId,
        sender_id: senderId,
        receiver_id: receiverId,
        message,
        created_at: new Date(),
      })
      .returning("*");
      const io=getIO()
    io.to(roomId).emit("receive_message", {
      message: chat.message,
      sender: chat.sender_id,
      id: chat.id,
      timestamp: chat.created_at,
    });
    res.status(201).json({ message: "Message sent successfully", chat });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: error.message });
  }
};
