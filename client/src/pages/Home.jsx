import { login, signup } from "../services/authServices";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Home({ getUserDetails }) {
    let navigate = useNavigate();
    const cookies = new Cookies();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleLoginChange(e) {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    }

    function handleSignupChange(e) {
        setSignupData({ ...signupData, [e.target.id]: e.target.value });
    }

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            const isLoggedIn = await login(loginData.email, loginData.password);
            if (isLoggedIn.status >= 200 && isLoggedIn.status < 300) {
                getUserDetails(isLoggedIn.data);
                navigate("/dashboard");
            }
        } catch (err) {
            alert("Email or Password incorrect! Please try again.");
        }
        setLoginData({ email: "", password: "" });
    }

    async function handleSignupSubmit(e) {
        e.preventDefault();
        try {
            const isSignedUp = await signup(
                signupData.name,
                signupData.email,
                signupData.password
            );
            if (isSignedUp.status >= 200 && isSignedUp.status < 300) {
                getUserDetails(isSignedUp.data);
                navigate("/dashboard");
            }
        } catch (err) {
            alert("Signup failed, Please try again!");
        }
        setSignupData({ name: "", email: "", password: "" });
    }

    return typeof cookies.get("authToken") == "undefined" ? (
        <>
            <h1 className="title">Shopping List</h1>
            <div className="container">
                <div className="loginDiv">
                    <form
                        className="loginForm"
                        onSubmit={(e) => handleLoginSubmit(e)}
                    >
                        <input
                            placeholder="Email"
                            onChange={(e) => handleLoginChange(e)}
                            type="email"
                            id="email"
                            value={loginData.email}
                        />
                        <input
                            placeholder="Password"
                            onChange={(e) => handleLoginChange(e)}
                            type="password"
                            id="password"
                            value={loginData.password}
                        />
                        <button className="btn" type="submit">
                            Log In
                        </button>
                    </form>
                </div>
                <div className="divider">
                    <div className="divider1"></div>
                    <div className="or">OR</div>
                    <div className="divider2"></div>
                </div>
                <div className="signupDiv">
                    <form
                        className="signupForm"
                        onSubmit={(e) => handleSignupSubmit(e)}
                    >
                        <input
                            placeholder="Name"
                            onChange={(e) => handleSignupChange(e)}
                            type="text"
                            id="name"
                            value={signupData.name}
                        />
                        <input
                            placeholder="Email"
                            onChange={(e) => handleSignupChange(e)}
                            type="email"
                            id="email"
                            value={signupData.email}
                        />
                        <input
                            placeholder="Password"
                            onChange={(e) => handleSignupChange(e)}
                            type="password"
                            id="password"
                            value={signupData.password}
                        />
                        <button className="btn" type="submit">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    ) : (
        <Navigate to="/dashboard" />
    );
}

export default Home;
