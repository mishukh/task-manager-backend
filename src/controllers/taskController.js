const Task = require("../models/Task");

// Create task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            organization: req.user.organization,
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
        const filters = { ...req.query, organization: req.user.organization };
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
        const task = await Task.findOne({ _id: req.params.id, organization: req.user.organization }).populate("project assignedTo createdBy");
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, organization: req.user.organization },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, organization: req.user.organization });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
