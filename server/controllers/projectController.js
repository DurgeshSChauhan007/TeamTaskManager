const Project = require("../models/Project");

const User = require("../models/User");


// CREATE PROJECT
// ONLY ADMIN USER CAN CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    // CHECK ROLE
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message:
          "Only Admin can create projects",
      });
    }

    const { title, description } =
      req.body;

    // VALIDATION
    if (!title || !description) {
      return res.status(400).json({
        message:
          "Title and Description are required",
      });
    }

    const project = await Project.create({
      title,
      description,

      admin: req.user.id,

      members: [
        {
          user: req.user.id,
          role: "Admin",
        },
      ],
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL PROJECTS OF LOGGED USER
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user.id,
    })
      .populate("members.user")
      .populate("admin");

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE PROJECT
exports.getProjectById = async (
  req,
  res
) => {
  try {
    const project = await Project.findById(
      req.params.id
    )
      .populate("members.user")
      .populate("admin");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // CHECK USER BELONGS TO PROJECT
    const isMember =
      project.members.find(
        (member) =>
          member.user._id.toString() ===
          req.user.id
      );

    if (!isMember) {
      return res.status(403).json({
        message:
          "Access denied to this project",
      });
    }

    res.json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { email } = req.body;

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ONLY ADMIN CAN ADD MEMBERS
    if (
      project.admin.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "Only Admin can add members",
      });
    }

    // FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // CHECK MEMBER ALREADY EXISTS
    const alreadyMember =
      project.members.find(
        (member) =>
          member.user.toString() ===
          user._id.toString()
      );

    if (alreadyMember) {
      return res.status(400).json({
        message:
          "User already member of project",
      });
    }

    // ADD MEMBER
    project.members.push({
      user: user._id,
      role: "Member",
    });

    await project.save();

    res.json({
      message: "Member added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// REMOVE MEMBER
exports.removeMember = async (
  req,
  res
) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ONLY ADMIN
    if (
      project.admin.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "Only Admin can remove members",
      });
    }

    // CANNOT REMOVE ADMIN
    if (
      project.admin.toString() ===
      req.params.memberId
    ) {
      return res.status(400).json({
        message:
          "Admin cannot be removed",
      });
    }

    // REMOVE MEMBER
    project.members =
      project.members.filter(
        (member) =>
          member.user.toString() !==
          req.params.memberId
      );

    await project.save();

    res.json({
      message: "Member removed successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};