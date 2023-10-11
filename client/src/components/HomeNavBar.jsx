import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";

const HomeNavBar = () => {
    let cookies = new Cookies();

    // Use useState to manage the login state
    const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.get("authToken"));

    const handleLogout = () => {
        cookies.remove("authToken");
        cookies.remove("userId");
        cookies.remove("name");

        // Update the login state to false
        setIsLoggedIn(false);
    };

    return (
        <nav className="bg-[#3B0D6A] flex items-center justify-between w-full py-[10px] px-[20px] max-md:fixed max-md:top-0">
            <Link className="siteName" to="/">
                Shopping List
            </Link>
            <ul className="flex flex-row justify-start items-center mr-[20px] max-md:mr-[5px]">
                <li className={`m-[5px] ${!isLoggedIn && "hidden"}`}>
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
                <li className={`m-[5px] ${isLoggedIn && "hidden"}`}>
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all"
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
                <li className={`m-[5px] ${!isLoggedIn && "hidden"}`}>
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all"
                        onClick={handleLogout}
                        to="/"
                    >
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default HomeNavBar;
