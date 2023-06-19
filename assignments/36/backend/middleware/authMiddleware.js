const jwt = require("jsonwebtoken");
const config = require("../config");

// Middleware for user authentication
exports.authenticateUser = (req, res, next) => {
    // Get the token from the request header
    const token = req.header("Authorization");

    if (!token) {
        res.status(401).json({ error: "No token provided" });
    } else {
        try {
            // Verify the token
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).json({ error: "Invalid token" });
        }
    }
};
