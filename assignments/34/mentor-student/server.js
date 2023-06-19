const express = require("express");
const mongoose = require("mongoose");
const Mentor = require("./models/Mentor");
const Student = require("./models/Student");

const app = express();
const port = 3000; // Choose any desired port number

// Connect to MongoDB database
mongoose
    .connect(
        "mongodb+srv://vetrivelannadurai:5LixL4zYPPkfKa37@cluster0.wgmlhvq.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error(err));

// Set up JSON parsing middleware
app.use(express.json());

// API endpoints
app.post("/mentors", async (req, res) => {
    try {
        const mentor = await Mentor.create(req.body);
        res.status(201).json(mentor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating mentor" });
    }
});

app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating student" });
    }
});

app.post("/students/assign/:mentorId", async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { studentId } = req.body;

        const mentor = await Mentor.findById(mentorId);
        const student = await Student.findById(studentId);

        if (!mentor || !student) {
            return res
                .status(404)
                .json({ message: "Mentor or student not found" });
        }

        student.mentor = mentorId;
        await student.save();

        res.json({ message: "Student assigned to mentor successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error assigning student to mentor" });
    }
});

app.put("/students/:studentId/assign", async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;

        const mentor = await Mentor.findById(mentorId);
        const student = await Student.findById(studentId);

        if (!mentor || !student) {
            return res
                .status(404)
                .json({ message: "Mentor or student not found" });
        }

        student.mentor = mentorId;
        await student.save();

        res.json({ message: "Mentor assigned to student successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error assigning mentor to student" });
    }
});

app.get("/mentors/:mentorId/students", async (req, res) => {
    try {
        const { mentorId } = req.params;

        const mentor = await Mentor.findById(mentorId).populate(
            "students",
            "name"
        );
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        res.json(mentor.students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving mentor students" });
    }
});

app.get("/students/:studentId/mentor", async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findById(studentId).populate(
            "mentor",
            "name"
        );
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student.mentor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving student mentor" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/*
Note 
Make sure to replace the MongoDB connection URL ('mongodb://localhost:27017/mentorstudent') with your actual MongoDB database URL.

Run the server:
In the terminal, run the command: node server.js

Endpoints 

- Create a Mentor: POST /mentors
- Create a Student: POST /students
- Assign a student to Mentor: POST /students/assign/:mentorId
- Assign or Change Mentor for a particular Student: PUT /students/:studentId/assign
- Show all students for a particular mentor: GET /mentors/:mentorId/students
- Show the previously assigned mentor for a particular student: GET /students/:studentId/mentor
*/
