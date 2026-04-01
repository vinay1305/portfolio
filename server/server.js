const express = require("express");
const app = express();
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");


app.use(cors());
app.use(express.json());
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const connectDB = require("./config/db");

connectDB();
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));