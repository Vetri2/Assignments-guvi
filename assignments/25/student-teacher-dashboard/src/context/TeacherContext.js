import React, { createContext, useState, useEffect } from "react";

export const TeacherContext = createContext();

const TeacherContextProvider = (props) => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await fetch("http://localhost:3001/teachers");
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const addTeacher = async (teacher) => {
        try {
            const response = await fetch("http://localhost:3001/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacher),
            });
            const data = await response.json();
            setTeachers([...teachers, data]);
        } catch (error) {
            console.error("Error adding teacher:", error);
        }
    };

    const deleteTeacher = async (id) => {
        try {
            await fetch(`http://localhost:3001/teachers/${id}`, {
                method: "DELETE",
            });
            setTeachers(teachers.filter((teacher) => teacher.id !== id));
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    return (
        <TeacherContext.Provider
            value={{ teachers, addTeacher, deleteTeacher }}>
            {props.children}
        </TeacherContext.Provider>
    );
};

export default TeacherContextProvider;
