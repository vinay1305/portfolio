const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

const auth = require("../middleware/authMiddleware");

// Public
router.post("/", createMessage);

// Admin
router.get("/", auth, getMessages);

module.exports = router;