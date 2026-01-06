const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.use(auth);

// Admin-only routes
router.get("/", role(["admin"]), getUsers);
router.delete("/:id", role(["admin"]), deleteUser);

// Any authenticated user
router.get("/:id", getUser);
router.put("/:id", role(["admin", "manager"]), updateUser);

module.exports = router;
