const Message = require("../models/Message");

// CREATE MESSAGE
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({ name, email, message });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully 📩",
      data: newMessage,
    });

  } catch (error) {
    console.error("Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while sending message",
    });
  }
};

// GET ALL MESSAGES (ADMIN ONLY)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      count: messages.length,
      data: messages,
    });

  } catch (error) {
    console.error("Fetch Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages",
    });
  }
};