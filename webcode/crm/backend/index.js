// index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const leadsRoutes = require("./routes/leadsRoutes");
const serviceRequestsRoutes = require("./routes/serviceRequestsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/service-requests", serviceRequestsRoutes);

// Connect to MongoDB
mongoose
    .connect(config.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch((error) => console.error("Failed to connect to MongoDB:", error));
