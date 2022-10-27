import { useEffect, useState } from "react";
import {
    createItem,
    deleteItem,
    exportItems,
    getItems,
    updateItem,
} from "../services/itemsServices";
import { v4 as uuidv4 } from "uuid";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Restricted from "./Restricted";
import ItemList from "../components/ItemList";
import NavBar from "../components/NavBar";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemId, setItemId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [newItems, setNewItems] = useState([]);
    const cookies = new Cookies();

    const handleNewItem = async (e) => {
        e.preventDefault();
        const newItem = {
            _id: uuidv4(),
            user_id: cookies.get("userId"),
            name: itemName,
            quantity: itemQuantity,
            isSelected: false,
        };
        const res = await createItem(newItem, cookies.get("authToken"));
        setItemName("");
        setItemQuantity("");
        setItems([...items, newItem]);
        if (res >= 400) alert("Error creating item");
    };

    const handleEdit = (item) => {
        setItemName(item.name);
        setItemQuantity(item.quantity);
        setItemId(item._id);
        setIsEdit(true);
    };

    const handleDelete = async (id) => {
        setItems(items.filter((item) => item._id !== id));
        await deleteItem(id, cookies.get("authToken"));
    };

    const handleNewListAdd = (item) => {
        const newItem = {
            _id: item._id,
            name: item.name,
            quantity: item.quantity,
        };
        let arr = [...newItems, newItem];
        let unique = arr.filter(
            (v, i, a) =>
                a.findIndex(
                    (t) => t.name === v.name && t.quantity === v.quantity
                ) === i
        );
        setNewItems([...unique]);
    };

    const handleNewListRemove = (item) => {
        setNewItems(newItems.filter((i) => i._id !== item._id));
    };

    const editItem = (e) => {
        e.preventDefault();
        const updatedItems = items.map((item) => {
            if (item._id === itemId) {
                item.name = itemName;
                item.quantity = itemQuantity;
                updateItem(item, cookies.get("authToken")).then((res) => {
                    item = res.data;
                });
            }
            return item;
        });
        setItems(updatedItems);
        setItemName("");
        setItemQuantity("");
        setItemId("");
        setIsEdit(false);
    };

    useEffect(() => {
        async function getItemsList() {
            const res = await getItems(
                cookies.get("authToken"),
                cookies.get("userId")
            );
            setItems(res);
            setNewItems(res.filter((item) => item.isSelected));
        }
        getItemsList();
        // eslint-disable-next-line
    }, []);

    const selectAll = () => {
        const updatedItems = items.map((item) => {
            item.isSelected = true;
            updateItem(item, cookies.get("authToken")).then((res) => {
                item = res.data;
            });
            return item;
        });
        setItems(updatedItems);
        setNewItems(updatedItems);
    };

    const deselectAll = () => {
        const updatedItems = items.map((item) => {
            if (item.isSelected) {
                item.isSelected = false;
                updateItem(item, cookies.get("authToken")).then((res) => {
                    item = res.data;
                });
            }
            return item;
        });
        setItems(updatedItems);
        setNewItems([]);
    };

    const exportAsCSV = async (itemsToExport = items) => {
        const payload = itemsToExport.map((item) => {
            return {
                Name: item.name,
                Quantity: item.quantity,
            };
        });

        const res = await exportItems(payload, cookies.get("authToken"));
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "items.csv");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return typeof cookies.get("authToken") != "undefined" ? (
        <div className="wrapper">
            <NavBar exportAsCSV={exportAsCSV} />
            <div className="dashboard">
                <h1 className="welcome">Welcome {cookies.get("name")}</h1>
                <form
                    className="addItem"
                    onSubmit={(e) => {
                        isEdit ? editItem(e) : handleNewItem(e);
                    }}
                >
                    <div className="inputDiv">
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
                    </div>
                    {isEdit ? (
                        <button className="addBtn">Edit Item</button>
                    ) : (
                        <button className="addBtn" type="submit">
                            Add Item
                        </button>
                    )}
                </form>
                {newItems.length > 0 && (
                    <div className="selected-div">
                        <Link
                            className="selected-link"
                            to="/selected"
                            state={{ newItems: newItems }}
                        >
                            SHOW SELECTED
                        </Link>
                        <button
                            className="selected-link"
                            onClick={() => exportAsCSV(newItems)}
                        >
                            EXPORT SELECTED
                        </button>
                        <button
                            className="selected-link"
                            onClick={() => selectAll()}
                        >
                            SELECT ALL
                        </button>
                        <button
                            className="selected-link"
                            onClick={() => deselectAll()}
                        >
                            CLEAR SELECTED
                        </button>
                    </div>
                )}
                <ItemList
                    handleNewListRemove={handleNewListRemove}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleNewListAdd={handleNewListAdd}
                    items={items}
                />
            </div>
        </div>
    ) : (
        <Restricted />
    );
}

export default Dashboard;
