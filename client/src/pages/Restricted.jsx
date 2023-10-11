import { Link } from "react-router-dom";

const Restricted = () => {
    return (
        <div className="error">
            <p>Access Restricted! Please go back to the homepage and Log In</p>
            <Link className="link" to="/login">
                Login
            </Link>
        </div>
    );
};

export default Restricted;
