const Project = require("../models/Project");

// Create project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            organization: req.user.organization,
            createdBy: req.user._id
        });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects in the organization
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ organization: req.user.organization });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single project
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            organization: req.user.organization
        });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, organization: req.user.organization },
            req.body,
            { new: true }
        );
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            organization: req.user.organization
        });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
