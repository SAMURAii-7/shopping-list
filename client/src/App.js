import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cookie from "universal-cookie";
import Selected from "./pages/Selected";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";

function App() {
    function getUserDetails(res) {
        let date = new Date();
        date.setDate(date.getDate() + 30);

        const token = res.headers.authorization;
        let authToken = "";
        if (typeof token !== "undefined" && token.startsWith("Bearer ")) {
            const parts = token.split(" ");
            if (parts.length === 2) {
                authToken = parts[1];
            }
        }

        const cookies = new Cookie();
        cookies.set("name", res.data.name, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: date,
        });
        cookies.set("authToken", authToken, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: date,
        });
        cookies.set("userId", res.data._id, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            expires: date,
        });
    }

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Home getUserDetails={getUserDetails} />}
                />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/selected" element={<Selected />} />
                <Route exact path="/forgot" element={<Forgot />} />
                <Route
                    exact
                    path="reset-password/:id/:token"
                    element={<Reset />}
                />
                <Route exact path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
