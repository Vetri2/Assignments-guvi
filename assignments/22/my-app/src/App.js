import React from "react";
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";

const App = () => {
    const dynamicData = "Hello, World!";

    return (
        <div>
            <ComponentA data={dynamicData} />
            <ComponentB data={dynamicData} />
        </div>
    );
};

export default App;
