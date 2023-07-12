import { useEffect, useState, useRef } from "react";
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
import SearchBar from "../components/SearchBar";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemId, setItemId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [newItems, setNewItems] = useState([]);
    const [searchedItem, setSearchedItem] = useState({});
    const formRef = useRef(null);
    const cookies = new Cookies();

    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSearch = (item) => {
        if (!item.name && searchedItem.name) {
            setItems(
                [...items, searchedItem].sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
            );
        } else {
            const updatedItems = items.filter((i) => i._id !== item._id);
            setItems(
                updatedItems.sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
            );
        }
        setSearchedItem(item);
    };

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
        setItems(
            [...items, newItem].sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
        );
        if (res >= 400) alert("Error creating item");
    };

    const handleEdit = (item) => {
        setItemName(item.name);
        setItemQuantity(item.quantity);
        setItemId(item._id);
        setIsEdit(true);
        scrollToForm();
    };

    const handleDelete = async (id) => {
        setItems(
            items
                .filter((item) => item._id !== id)
                .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
        );
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
        setNewItems(
            [...unique].sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
        );
    };

    const handleNewListRemove = (item) => {
        setNewItems(
            newItems
                .filter((i) => i._id !== item._id)
                .sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
        );
    };

    const editItem = (e) => {
        e.preventDefault();
        if (searchedItem.name) {
            searchedItem.name = itemName;
            searchedItem.quantity = itemQuantity;
            updateItem(searchedItem, cookies.get("authToken")).then((res) => {
                setSearchedItem(res.data);
            });
        } else {
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
            setItems(
                updatedItems.sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
            );
        }
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
            setItems(
                res.sort((a, b) =>
                    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
            );
            setNewItems(
                res
                    .filter((item) => item.isSelected)
                    .sort((a, b) =>
                        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                    )
            );
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
        setItems(
            updatedItems.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
        );
        setNewItems(
            updatedItems.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
        );
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
        setItems(
            updatedItems.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            )
        );
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
                    ref={formRef}
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
                <SearchBar data={items} handleSearch={handleSearch} />
                {searchedItem.name && (
                    <div className="showResults">
                        <ItemList
                            items={[searchedItem]}
                            handleNewListRemove={handleNewListRemove}
                            handleEdit={handleEdit}
                            handleNewListAdd={handleNewListAdd}
                            itemListHeading="Search Results"
                        />
                    </div>
                )}
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
                    itemListHeading="Your Items"
                />
            </div>
        </div>
    ) : (
        <Restricted />
    );
}

export default Dashboard;
