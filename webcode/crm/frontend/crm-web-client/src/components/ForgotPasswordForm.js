import React, { useState } from "react";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement forgot password functionality
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ForgotPasswordForm;
