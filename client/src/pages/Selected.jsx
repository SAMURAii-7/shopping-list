import React from "react";
import NavBar from "../components/NavBar";
import { Navigate, useLocation } from "react-router-dom";

const Selected = () => {
    const location = useLocation();
    let items;
    if (location.state !== null) {
        items = location.state.newItems;
    }

    return location.state === null ? (
        <Navigate to="/dashboard" />
    ) : (
        <div className="wrapper">
            <NavBar />
            <div className="selected-wrapper">
                <h1 className="selected-title pt-[30px]">Selected Items</h1>
                {items.map((item) => (
                    <div key={item._id} className="item">
                        <h3>{item.name}</h3>
                        <p>{item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Selected;
