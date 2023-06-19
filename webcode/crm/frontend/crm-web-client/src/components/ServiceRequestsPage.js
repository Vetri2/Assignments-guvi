import React, { useEffect, useState } from "react";

const ServerRequestsPage = () => {
    const [serverRequests, setServerRequests] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        // Fetch server requests data from the backend API
        fetch("/api/server-requests", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setServerRequests(data))
            .catch((error) => console.error(error));
    }, [token]);

    const handleAddServerRequest = () => {
        // Make an API request to add a new server request
        fetch("/api/server-requests", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: "New Server Request" }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the serverRequests state with the added server request
                setServerRequests([...serverRequests, data]);
            })
            .catch((error) => console.error(error));
    };

    const handleRemoveServerRequest = (id) => {
        // Make an API request to remove a server request
        fetch(`/api/server-requests/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the server request from the serverRequests state
                    const updatedServerRequests = serverRequests.filter(
                        (request) => request.id !== id
                    );
                    setServerRequests(updatedServerRequests);
                } else {
                    console.error("Failed to remove server request");
                }
            })
            .catch((error) => console.error(error));
    };

    // ... handleEditServerRequest and other functions

    return (
        <div>
            <h2>Server Requests</h2>
            <button onClick={handleAddServerRequest}>Add Server Request</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {serverRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.title}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleRemoveServerRequest(request.id)
                                    }>
                                    Remove
                                </button>
                                {/* ... other action buttons */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServerRequestsPage;
