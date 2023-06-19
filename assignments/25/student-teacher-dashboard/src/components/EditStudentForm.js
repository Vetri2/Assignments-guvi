import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudentForm = () => {
    const [student, setStudent] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the student data based on the id
        // and update the state
        const fetchStudent = async () => {
            try {
                const response = await fetch(`/api/students/${id}`);
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudent();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update the student data using an API call
            await fetch(`/api/students/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });

            // Navigate back to the student list page
            navigate("/students");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={student.name || ""}
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
                        value={student.email || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditStudentForm;
