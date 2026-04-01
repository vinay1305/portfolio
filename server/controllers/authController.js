const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlackListedToken");
// REGISTER (run once manually)
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // 🔹 1. Validate fields
        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 🔹 2. Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already registered with this email",
            });
        }

        // 🔹 3. Password length check
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // 🔹 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 5. Create admin
        const admin = await Admin.create({
            username,
            email,
            password: hashedPassword,
        });

        // 🔹 6. Success response
        return res.status(201).json({
            success: true,
            message: "Admin registered successfully ✅",
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
            },
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while registering admin",
        });
    }
};
// LOGIN
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // 🔹 2. Check if admin exists
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found with this email",
            });
        }

        // 🔹 3. Compare password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 🔹 4. Generate token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 🔹 5. Success response
        return res.status(200).json({
            success: true,
            message: "Login successful ✅",
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while logging in",
        });
    }
};

exports.logoutAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No token provided",
            });
        }

        // Save token to blacklist
        await BlacklistedToken.create({ token });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully ✅",
        });

    } catch (error) {
        console.error("Logout Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during logout",
        });
    }
};