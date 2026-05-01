const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getProjectTasks,
} = require("../controllers/taskController");


// CREATE TASK
// ONLY ADMIN CAN CREATE TASK
router.post("/", auth, createTask);


// GET LOGGED IN USER TASKS
router.get("/", auth, getTasks);


// UPDATE TASK STATUS
// ONLY ASSIGNED MEMBER CAN UPDATE
router.put("/:id", auth, updateTaskStatus);


// GET TASKS OF PARTICULAR PROJECT
router.get(
  "/project/:projectId",
  auth,
  getProjectTasks
);

module.exports = router;