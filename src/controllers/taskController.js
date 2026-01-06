const Task = require("../models/Task");

// Create task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user._id
        });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all tasks (optionally filter by project, status, or assigned user)
exports.getTasks = async (req, res) => {
    try {
        const filters = { ...req.query };
        if (filters.project) filters.project = filters.project;
        if (filters.status) filters.status = filters.status;
        if (filters.assignedTo) filters.assignedTo = filters.assignedTo;

        const tasks = await Task.find(filters).populate("project assignedTo createdBy");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single task
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("project assignedTo createdBy");
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
