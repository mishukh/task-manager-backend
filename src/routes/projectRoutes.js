const express = require("express");
const router = express.Router();
const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

router.post("/", role(["admin","manager"]), createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", role(["admin","manager"]), updateProject);
router.delete("/:id", role(["admin","manager"]), deleteProject);

module.exports = router;
