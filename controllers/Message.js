import Message from "../model/Message.js";

// Get all messages for a user
export const getMessagesForUser = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    })
      .populate("sender", "username")
      .populate("receiver", "username");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;
  try {
    const message = new Message({ sender: req.user.id, receiver, content });
    await message.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
