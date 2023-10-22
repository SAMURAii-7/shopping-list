import { Link } from "react-router-dom";

const Restricted = () => {
    return (
        <div className="error max-md:w-full max-md:p-[10px]">
            <p className="max-md:text-center">
                Access Restricted! Please go back to the homepage and Log In
            </p>
            <Link className="link max-md:p-[10px] max-md:w-[100px]" to="/login">
                Login
            </Link>
        </div>
    );
};

export default Restricted;
