import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const NavBar = ({ exportAsCSV }) => {
    let cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove("authToken");
        cookies.remove("userId");
        cookies.remove("name");
    };

    return (
        <nav className="dashboardHeader">
            <Link className="siteName" to="/">
                Shopping List
            </Link>
            <ul>
                <li>
                    <button className="link" onClick={() => exportAsCSV()}>
                        EXPORT ALL
                    </button>
                </li>
                <li>
                    <Link className="link" onClick={handleLogout} to="/">
                        LOGOUT
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
