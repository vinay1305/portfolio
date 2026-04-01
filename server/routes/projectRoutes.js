const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware"); // 👈 ADD THIS

router.get("/", getProjects);

// 👇 PROTECT THIS ROUTE
router.post("/", auth, createProject);

module.exports = router;