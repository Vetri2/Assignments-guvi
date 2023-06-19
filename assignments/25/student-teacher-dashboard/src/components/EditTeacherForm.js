import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTeacherForm = () => {
    const [teacher, setTeacher] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch the teacher data based on the id
        // and update the state
        const fetchTeacher = async () => {
            try {
                const response = await fetch(`/api/teachers/${id}`);
                const data = await response.json();
                setTeacher(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeacher();
    }, [id]);

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
            // Update the teacher data using an API call
            await fetch(`/api/teachers/${id}`, {
                method: "PUT",
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
            <h2>Edit Teacher</h2>
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
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditTeacherForm;
