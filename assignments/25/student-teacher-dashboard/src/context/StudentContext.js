import React, { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch("http://localhost:3001/students");
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const addStudent = async (student) => {
        try {
            const response = await fetch("http://localhost:3001/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });
            const data = await response.json();
            setStudents([...students, data]);
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await fetch(`http://localhost:3001/students/${id}`, {
                method: "DELETE",
            });
            setStudents(students.filter((student) => student.id !== id));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <StudentContext.Provider
            value={{ students, addStudent, deleteStudent }}>
            {props.children}
        </StudentContext.Provider>
    );
};

export default StudentContextProvider;
