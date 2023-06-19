import React, { useEffect, useState } from "react";
import axios from "axios";

const URLList = () => {
    const [urls, setURLs] = useState([]);

    useEffect(() => {
        const fetchURLs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/urls"
                );
                setURLs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchURLs();
    }, []);

    return (
        <div>
            <h2>URL List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th></th>
                        <th>Short URL</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.id}>
                            <td>{url.longURL}</td>
                            <td>&nbsp;&nbsp;&nbsp;</td>
                            <td>{url.shortURL}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default URLList;
