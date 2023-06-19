import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import DashboardPage from "./components/DashboardPage";
import LeadsPage from "./components/LeadsPage";
import ServiceRequestsPage from "./components/ServiceRequestsPage";
import ContactsPage from "./components/ContactsPage";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPasswordPage />}
                    />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/leads" element={<LeadsPage />} />
                    <Route
                        path="/service-requests"
                        element={<ServiceRequestsPage />}
                    />
                    <Route path="/contacts" element={<ContactsPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
