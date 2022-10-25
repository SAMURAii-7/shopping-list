import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cookie from "universal-cookie";
import Selected from "./pages/Selected";

function App() {
    function getUserDetails(data) {
        let date = new Date();
        date.setDate(date.getDate() + 30);

        const cookies = new Cookie();
        cookies.set("name", data.name, { expires: date });
        cookies.set("authToken", data.accessToken, { expires: date });
        cookies.set("userId", data._id, { expires: date });
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
                <Route exact path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
