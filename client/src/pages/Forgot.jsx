import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authServices";

function Forgot() {
    const [email, setEmail] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    async function handleForgotSubmit(e) {
        e.preventDefault();
        try {
            const isSent = await forgotPassword(email);
            if (isSent.status >= 200 && isSent.status < 300) {
                alert("Email sent for password reset!");
            }
        } catch (err) {
            alert("Email incorrect! Please try again.");
        }

        setEmail("");
    }

    return (
        <form className="loginForm" onSubmit={(e) => handleForgotSubmit(e)}>
            <p>Enter your Email</p>
            <input
                placeholder="Email"
                onChange={(e) => handleEmailChange(e)}
                type="email"
                id="email"
                value={email}
            />
            <button className="btn" type="submit">
                Submit
            </button>
            <Link className="link" to="/">
                Go To Home
            </Link>
        </form>
    );
}

export default Forgot;
