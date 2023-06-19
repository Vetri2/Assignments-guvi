const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/forgot-password", (req, res) => {
    const { email } = req.body;

    // Generate a random token
    const token = crypto.randomBytes(20).toString("hex");

    // Send the password reset email to the user's email address with the generated token
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password",
        },
    });

    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Please click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });

    res.sendStatus(200);
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

/*
Note
- Replace the your-email@gmail.com and your-email-password placeholders in the code above with your own Gmail email and password. Make sure to allow less secure apps to access your Gmail account or set up an app password if you have two-factor authentication enabled.
- Run the Node.js server by executing the following command in your terminal: node index.js



*/
