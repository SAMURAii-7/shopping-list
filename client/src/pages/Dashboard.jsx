import { useEffect, useState } from "react";
import Item from "../components/Item";
import { createItem, getItems } from "../services/itemsServices";
import { v4 as uuidv4 } from "uuid";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");

    const handleNewItem = async (e) => {
        e.preventDefault();
        const newItem = {
            _id: uuidv4(),
            user_id: localStorage.getItem("userId"),
            name: itemName,
            quantity: itemQuantity,
        };
        const res = await createItem(
            newItem,
            localStorage.getItem("authToken")
        );
        setItemName("");
        setItemQuantity("");
        setItems([...items, newItem]);
        if (res >= 400) alert("Error creating item");
    };

    useEffect(() => {
        async function getItemsList() {
            const res = await getItems(
                localStorage.getItem("authToken"),
                localStorage.getItem("userId")
            );
            setItems(res);
        }
        getItemsList();
    }, []);

    return (
        <div>
            <h1>Welcome {localStorage.getItem("name")}</h1>
            <form onSubmit={(e) => handleNewItem(e)}>
                <input
                    onChange={(e) => {
                        setItemName(e.target.value);
                    }}
                    type="text"
                    placeholder="Item"
                    value={itemName}
                />
                <input
                    onChange={(e) => {
                        setItemQuantity(e.target.value);
                    }}
                    type="text"
                    placeholder="Quantity"
                    value={itemQuantity}
                />
                <button type="submit">Add Item</button>
            </form>
            <div>
                <h2>Your Items</h2>
                {typeof items === "undefined" || items.length === 0 ? (
                    <p>No items found</p>
                ) : (
                    items.map((item) => <Item key={item._id} item={item} />)
                )}
            </div>
        </div>
    );
}

export default Dashboard;
