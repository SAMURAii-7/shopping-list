import { Link } from "react-router-dom";

const HomeNavBar = () => {
    return (
        <nav className="fixed top-0 bg-[#3B0D6A] flex items-center justify-between w-full py-[10px] px-[20px]">
            <Link className="siteName" to="/">
                Shopping List
            </Link>
            <ul>
                <li className="m-[5px]">
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        className="text-white p-[5px] hover:bg-white hover:text-inherit hover:rounded-[2px] transition-all"
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default HomeNavBar;
