const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost/url-shortener", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB:", error);
    });
