const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Register a new user
exports.registerUser = (req, res) => {
    const { email, password } = req.body;

    // Create a new user
    const newUser = new User({ email, password });

    // Save the user to the database
    newUser
        .save()
        .then(() => {
            res.status(201).json({ message: "User registered successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to register user" });
        });
};

// Authenticate user
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(401).json({ error: "Invalid email or password" });
            } else {
                // Validate the password
                if (password !== user.password) {
                    res.status(401).json({
                        error: "Invalid email or password",
                    });
                } else {
                    // Generate and send JWT token
                    const token = jwt.sign(
                        { userId: user._id },
                        config.jwtSecret
                    );
                    res.status(200).json({ token });
                }
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to authenticate user" });
        });
};
