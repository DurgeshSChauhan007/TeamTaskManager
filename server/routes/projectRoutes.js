const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  addMember,
  removeMember,
} = require("../controllers/projectController");

router.post("/", auth, createProject);

router.get("/", auth, getProjects);

router.get("/:id", auth, getProjectById);

router.post(
  "/:id/add-member",
  auth,
  addMember
);

router.delete(
  "/:projectId/remove-member/:memberId",
  auth,
  removeMember
);

module.exports = router;