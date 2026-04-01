const express = require("express");
const router = express.Router();
const {
    loginAdmin,
    registerAdmin,
    logoutAdmin
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // use once
router.post("/logout", auth, logoutAdmin);
module.exports = router;