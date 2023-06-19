import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ForgetPassword} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
