const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlackListedToken" );
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // 🔥 Check blacklist
        const isBlacklisted = await BlacklistedToken.findOne({ token });

        if (isBlacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};