const Task = require("../models/Task");

const Project = require("../models/Project");


// CREATE TASK
// ONLY PROJECT ADMIN CAN CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      project,
    } = req.body;

    // VALIDATION
    if (
      !title ||
      !description ||
      !dueDate ||
      !priority ||
      !assignedTo ||
      !project
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // FIND PROJECT
    const existingProject =
      await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ONLY ADMIN OF PROJECT
    if (
      existingProject.admin.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "Only Project Admin can create tasks",
      });
    }

    // CHECK ASSIGNED USER IS PROJECT MEMBER
    const memberExists =
      existingProject.members.find(
        (member) =>
          member.user.toString() ===
          assignedTo
      );

    if (!memberExists) {
      return res.status(400).json({
        message:
          "Assigned user is not a member of this project",
      });
    }

    // CREATE TASK
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      project,
      status: "To Do",
    });

    // POPULATE RESPONSE
    const populatedTask =
      await Task.findById(task._id)
        .populate("assignedTo")
        .populate("project");

    res.status(201).json(populatedTask);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL TASKS OF LOGGED USER
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    })
      .populate("assignedTo")
      .populate("project");

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
// ONLY ASSIGNED USER CAN UPDATE
exports.updateTaskStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    // VALID STATUS
    const validStatuses = [
      "To Do",
      "In Progress",
      "Done",
    ];

    if (
      !validStatuses.includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ONLY ASSIGNED USER
    if (
      task.assignedTo.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can update only your assigned tasks",
      });
    }

    task.status = status;

    await task.save();

    const updatedTask =
      await Task.findById(task._id)
        .populate("assignedTo")
        .populate("project");

    res.json(updatedTask);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASKS OF PARTICULAR PROJECT
exports.getProjectTasks = async (
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

    // CHECK USER BELONGS TO PROJECT
    const isMember =
      project.members.find(
        (member) =>
          member.user.toString() ===
          req.user.id
      );

    if (!isMember) {
      return res.status(403).json({
        message:
          "Access denied to this project",
      });
    }

    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo")
      .populate("project");

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};