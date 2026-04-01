const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully ✅",
      count: projects.length,
      data: projects,
    });

  } catch (error) {
    console.error("Get Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching projects",
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl } = req.body;

    // 🔹 1. Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // 🔹 2. Create project
    const project = await Project.create({
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
    });

    // 🔹 3. Success response
    return res.status(201).json({
      success: true,
      message: "Project created successfully 🚀",
      data: project,
    });

  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating project",
    });
  }
};