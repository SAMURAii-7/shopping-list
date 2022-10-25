import React from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";

const Selected = () => {
    const location = useLocation();
    const items = location.state.newItems;

    return (
        <div className="wrapper">
            <NavBar />
            <div className="selected-wrapper">
                <h1 className="selected-title">Selected Items</h1>
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
