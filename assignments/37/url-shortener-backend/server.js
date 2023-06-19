const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));

// Define the URL model
const URL = mongoose.model("URL", {
    longURL: String,
    shortURL: String,
});

// Define the User model
const User = mongoose.model("User", {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    isActive: Boolean,
});

// Function to generate JWT token
const generateAuthToken = (userId) => {
    const payload = {
        user: {
            id: userId,
        },
    };

    return jwt.sign(payload, "mysecretkey", { expiresIn: "1h" });
};

// Routes
app.post("/api/register", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    console.log("Request Body =>", req.body);
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            isActive: false,
        });

        await user.save();

        // Send activation email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const activationURL = `http://localhost:3000/activate-account/${user._id}`;

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Activate your account",
            html: `<p>Please click the following link to activate your account:</p>
               <p><a href="${activationURL}">${activationURL}</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({
            message: "Registration successful. Activation email sent.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // Check if the user's account is activated
        if (!user.isActive) {
            return res.status(403).json({ message: "Account not activated" });
        }

        // Generate and return a JWT token for authentication
        const token = generateAuthToken(user._id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a random token
        const token = generateRandomToken();

        // Store the token in the database for password reset verification
        user.resetPasswordToken = token;
        user.resetPasswordTokenExpiry = Date.now() + 3600000; // Token expiry in 1 hour
        await user.save();

        // Send the password reset email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetURL = `http://localhost:3000/reset-password/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Reset your password",
            html: `<p>Please click the following link to reset your password:</p>
               <p><a href="${resetURL}">${resetURL}</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Check if the token is valid and not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        // Update the user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/url-counts", async (req, res) => {
    try {
        // Get the count of URLs created per day and month
        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const dailyCount = await URL.countDocuments({
            createdAt: { $gte: startOfDay },
        });
        const monthlyCount = await URL.countDocuments({
            createdAt: { $gte: startOfMonth },
        });

        res.json({ counts: { day: dailyCount, month: monthlyCount } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

const generateShortURL = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let shortURL = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortURL += characters.charAt(randomIndex);
    }

    return shortURL;
};

app.post("/api/shorten-url", async (req, res) => {
    const { longURL } = req.body;

    try {
        // Generate a short URL
        const shortURL = generateShortURL();

        // Create a new URL entry
        const url = new URL({
            longURL,
            shortURL,
        });

        await url.save();

        res.json({ shortURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/urls", async (req, res) => {
    try {
        // Retrieve all created URLs
        const urls = await URL.find();

        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/urls/:shortURL", async (req, res) => {
    const { shortURL } = req.params;

    try {
        // Find the corresponding URL for the short URL
        const url = await URL.findOne({ shortURL });

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Increment the click count for the URL
        url.clickCount += 1;
        await url.save();

        res.redirect(url.originalURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/activate-account/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by their ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Activate the user's account
        user.isActive = true;
        await user.save();

        res.json({ message: "Account activated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
