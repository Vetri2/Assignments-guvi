const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000; // Choose any desired port number

app.get("/create-file", (req, res) => {
    const timestamp = new Date().toISOString();
    const filename = `${timestamp}.txt`;

    fs.writeFile(`folder/${filename}`, timestamp, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error creating file");
        }
        res.send("File created successfully");
    });
});

app.get("/get-files", (req, res) => {
    fs.readdir("folder", (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving files");
        }
        res.send(files);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/*
To create a text file: http://localhost:3000/create-file
To retrieve all text files: http://localhost:3000/get-files
*/
