import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="container">
        //         <div className="row">
        //             <div class="col">

        //             </div>
        //         </div>
        //     </div>
        // </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto d-flex">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                List Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create-user" className="nav-link">
                                Create User
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/edit-user/1" className="nav-link">
                                Edit user
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile/1" className="nav-link">
                                View profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/edit-profile/1" className="nav-link">
                                Edit profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
