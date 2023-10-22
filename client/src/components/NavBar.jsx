import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";

const NavBar = ({ exportAsCSV }) => {
    const [isActive, setIsActive] = useState(false);
    let cookies = new Cookies();

    const location = useLocation();

    const handleLogout = () => {
        cookies.remove("authToken");
        cookies.remove("userId");
        cookies.remove("name");
    };

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="fixed top-0 bg-[#3B0D6A] flex items-center justify-between w-full py-[5px] px-[20px]">
            <Link className="siteName" to="/">
                Shopping List
            </Link>
            <ul
                className={`flex flex-row justify-start items-center max-md:absolute max-md:right-[-100%] max-md:top-[3rem] max-md:flex-col max-md:w-[300px] max-md:text-center max-md:h-[200px] max-md:border max-md:border-[#3B0D6A] max-md:justify-center max-md:rounded-[10px] max-md:bg-white ${
                    isActive && "max-md:right-[30px]"
                }`}
            >
                <li className="max-md:my-[5px]">
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all max-md:text-[#3B0D6A]"
                        to="/"
                    >
                        Home
                    </Link>
                </li>
                <li className="max-md:my-[5px]">
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all max-md:text-[#3B0D6A]"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
                {location.pathname === "/dashboard" && (
                    <li className="max-md:my-[5px]">
                        <button
                            className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all max-md:text-[#3B0D6A]"
                            onClick={() => exportAsCSV()}
                        >
                            Export All
                        </button>
                    </li>
                )}
                <li className="max-md:my-[5px]">
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all max-md:text-[#3B0D6A]"
                        onClick={handleLogout}
                        to="/"
                    >
                        Logout
                    </Link>
                </li>
            </ul>
            <div
                className="hidden max-md:block max-md:cursor-pointer"
                onClick={handleClick}
            >
                <span
                    className={`block w-[25px] h-[3px] my-[5px] mx-[3px] transition-all duration-500 ease-in-out bg-white ${
                        isActive && "translate-y-[8px] -rotate-45"
                    }`}
                ></span>
                <span
                    className={`block w-[25px] h-[3px] my-[5px] mx-[3px] transition-all duration-500 ease-in-out bg-white ${
                        isActive && "opacity-0"
                    }`}
                ></span>
                <span
                    className={`block w-[25px] h-[3px] my-[5px] mx-[3px] transition-all duration-500 ease-in-out bg-white ${
                        isActive && "-translate-y-[8px] rotate-45"
                    }`}
                ></span>
            </div>
        </nav>
    );
};

export default NavBar;
