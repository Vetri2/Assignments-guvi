import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TeacherContext } from "../context/TeacherContext";

const TeacherList = () => {
    const { teachers, deleteTeacher } = useContext(TeacherContext);

    return (
        <div>
            <h2>Teacher List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                            <td>{teacher.id}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.subject}</td>
                            <td>
                                <Link
                                    to={`/teachers/edit/${teacher.id}`}
                                    className="btn btn-primary mr-2">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteTeacher(teacher.id)}
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/teachers/add" className="btn btn-success">
                Add Teacher
            </Link>
        </div>
    );
};

export default TeacherList;
