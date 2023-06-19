import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import URLShortener from "./URLShortener";
import URLList from "./URLList";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/forgot-password">Forgot Password</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/url-shortener">URL Shortener</Link>
                        </li>
                        <li>
                            <Link to="/url-list">URL List</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/url-shortener" element={<URLShortener />} />
                    <Route path="/url-list" element={<URLList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
