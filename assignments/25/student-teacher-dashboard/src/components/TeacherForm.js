import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherForm = () => {
    const [teacher, setTeacher] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prevTeacher) => ({
            ...prevTeacher,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create the teacher using an API call
            await fetch("/api/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacher),
            });

            // Navigate back to the teacher list page
            navigate("/teachers");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Teacher</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={teacher.name || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={teacher.email || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default TeacherForm;
