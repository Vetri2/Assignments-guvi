const nodemailer = require("nodemailer");
const config = require("../config");

// Utility function to send email notifications
exports.sendEmail = async (to, subject, message) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "your-email-service",
            auth: {
                user: "your-email",
                pass: "your-password",
            },
        });

        // Send the email
        await transporter.sendMail({
            from: "your-email",
            to,
            subject,
            text: message,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Failed to send email:", error);
    }
};
