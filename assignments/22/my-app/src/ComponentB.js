import React from "react";

const ComponentB = ({ data }) => {
    return (
        <div>
            <h3>Component B</h3>
            <p>Data from Component A: {data}</p>
        </div>
    );
};

export default ComponentB;
