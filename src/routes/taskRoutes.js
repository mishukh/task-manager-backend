const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

router.post("/", role(["admin","manager"]), createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", role(["admin","manager"]), updateTask);
router.delete("/:id", role(["admin","manager"]), deleteTask);

module.exports = router;
