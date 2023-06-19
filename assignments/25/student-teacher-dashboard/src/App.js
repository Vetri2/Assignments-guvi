import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import EditStudentForm from "./components/EditStudentForm";
import TeacherList from "./components/TeacherList";
import TeacherForm from "./components/TeacherForm";
import EditTeacherForm from "./components/EditTeacherForm";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/students/add" element={<StudentForm />} />
                    <Route
                        path="/students/edit/:id"
                        element={<EditStudentForm />}
                    />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="/teachers/add" element={<TeacherForm />} />
                    <Route
                        path="/teachers/edit/:id"
                        element={<EditTeacherForm />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
