const express = require("express");
const router = express.Router();
const {
  trackVisit,
  getStats,
} = require("../controllers/analyticsController");

const auth = require("../middleware/authMiddleware");

// Public tracking
router.post("/track", trackVisit);

// Admin stats
router.get("/stats", auth, getStats);

module.exports = router;