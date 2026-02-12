const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
// require("dotenv").config();
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // this one is used to hash

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });  // for creating user

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });

};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn:process.env.JWT_EXPIRES_IN}
    );

    res.json({
        message: "Login successful",
        token
    });
}
