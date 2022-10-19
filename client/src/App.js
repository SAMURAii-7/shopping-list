import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
    function getUserDetails(data) {
        localStorage.setItem("name", data.name);
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("userId", data._id);
    }

    function getAuthToken(data) {
        localStorage.setItem("authToken", data);
    }

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Home
                            getAuthToken={getAuthToken}
                            getUserDetails={getUserDetails}
                        />
                    }
                />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
