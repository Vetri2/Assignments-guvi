import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import ListUsers from "./ListUsers";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<ListUsers />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/edit-user/:id" element={<EditUser />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/edit-profile/:id" element={<EditProfile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
