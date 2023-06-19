import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/forgot-password", { email });
            setMessage("Password reset email sent. Please check your inbox.");
        } catch (error) {
            setMessage("Email not found. Please try again.");
        }
    };

    return (
        <div>
            <h2>Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ForgetPassword;
