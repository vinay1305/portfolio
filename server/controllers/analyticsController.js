const Visitor = require("../models/Visitor");

// TRACK VISIT
exports.trackVisit = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const { page } = req.body;

    await Visitor.create({
      ip,
      userAgent,
      page,
    });

    res.status(201).json({
      success: true,
      message: "Visit tracked 📊",
    });

  } catch (error) {
    console.error("Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: "Error tracking visit",
    });
  }
};

// GET STATS (ADMIN)
exports.getStats = async (req, res) => {
  try {
    const totalVisits = await Visitor.countDocuments();

    const recentVisits = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      message: "Analytics fetched",
      totalVisits,
      recentVisits,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
    });
  }
};