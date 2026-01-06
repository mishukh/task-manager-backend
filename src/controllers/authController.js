const User = require("../models/User");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password, orgName } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const org = await Organization.create({ name: orgName });
        const user = await User.create({
            username,
            email,
            password: hashed,
            organization: org._id,
            role: "admin"
        });
        res.json({ message: "User registered", userId: user._id });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "Invalid email" });
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ message: "Invalid password" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};
