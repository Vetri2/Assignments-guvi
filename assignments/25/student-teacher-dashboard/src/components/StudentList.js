import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

const StudentList = () => {
    const { students, deleteStudent } = useContext(StudentContext);

    return (
        <div>
            <h2>Student List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>
                                <Link
                                    to={`/students/edit/${student.id}`}
                                    className="btn btn-primary mr-2">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteStudent(student.id)}
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/students/add" className="btn btn-success">
                Add Student
            </Link>
        </div>
    );
};

export default StudentList;
