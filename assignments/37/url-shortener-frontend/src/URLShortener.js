import React, { useState } from "react";
import axios from "axios";

const URLShortener = () => {
    const [longURL, setLongURL] = useState("");
    const [shortURL, setShortURL] = useState("");

    const handleShortenURL = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/api/shorten-url",
                { longURL }
            );
            setShortURL(response.data.shortURL);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>URL Shortener</h2>
            <form onSubmit={handleShortenURL}>
                <input
                    type="text"
                    placeholder="Long URL"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                />
                <button type="submit">Shorten URL</button>
            </form>
            {shortURL && <p>Short URL: {shortURL}</p>}
        </div>
    );
};

export default URLShortener;
