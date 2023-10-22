import { useEffect, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
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
import Spinner from "../components/Spinner";
import { pingApi } from "../services/authServices";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemId, setItemId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [searchedItem, setSearchedItem] = useState({});
    const cookies = new Cookies();

    useEffect(() => {
        const pingCheck = async () => {
            const res = await pingApi();
            if (res.status === 200) setLoading(false);
        };
        pingCheck();
    }, []);

    const queryClient = useQueryClient();

    const { data: items, isPending: isItemsPending } = useQuery({
        enabled: cookies.get("authToken") !== undefined,
        queryKey: ["items", cookies.get("authToken")],
        queryFn: async () => {
            const res = await getItems(
                cookies.get("authToken"),
                cookies.get("userId")
            );
            res.sort((a, b) =>
                a.name.localeCompare(b.name, undefined, {
                    sensitivity: "base",
                })
            );
            return res;
        },
    });

    const { data: listItems, isPending: isListItemsPending } = useQuery({
        enabled: items !== undefined,
        queryKey: ["items", cookies.get("authToken"), "listItems"],
        queryFn: () => {
            const res = items.filter((item) => item.isSelected);
            res.sort((a, b) =>
                a.name.localeCompare(b.name, undefined, {
                    sensitivity: "base",
                })
            );
            return res;
        },
    });

    const { mutate: createItemMutation } = useMutation({
        mutationFn: (item) => createItem(item, cookies.get("authToken")),
    });
    const { mutate: deleteItemMutation } = useMutation({
        mutationFn: (id) => deleteItem(id, cookies.get("authToken")),
    });
    const { mutate: updateItemMutation } = useMutation({
        mutationFn: (item) => updateItem(item, cookies.get("authToken")),
    });

    const scrollToForm = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
        createItemMutation(newItem, {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "items",
                    cookies.get("authToken"),
                ]);
            },
            onError: (err) => {
                alert("Error creating item");
                throw err;
            },
        });
        setItemName("");
        setItemQuantity("");
    };

    const handleEdit = (item) => {
        setItemName(item.name);
        setItemQuantity(item.quantity);
        setItemId(item._id);
        setIsEdit(true);
        scrollToForm();
    };

    const handleDelete = async (id) => {
        deleteItemMutation(id, {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "items",
                    cookies.get("authToken"),
                ]);
            },
        });
    };

    const editItem = (e) => {
        e.preventDefault();
        if (searchedItem.name) {
            searchedItem.name = itemName;
            searchedItem.quantity = itemQuantity;
            updateItemMutation(searchedItem, {
                onSuccess: (res) => {
                    queryClient.invalidateQueries([
                        "items",
                        cookies.get("authToken"),
                    ]);
                    setSearchedItem(res.data);
                },
            });
        } else {
            items.forEach((item) => {
                if (item._id === itemId) {
                    item.name = itemName;
                    item.quantity = itemQuantity;
                    updateItemMutation(item, {
                        onSuccess: () => {
                            queryClient.invalidateQueries([
                                "items",
                                cookies.get("authToken"),
                            ]);
                        },
                    });
                }
            });
        }
        setItemName("");
        setItemQuantity("");
        setItemId("");
        setIsEdit(false);
    };

    const selectAll = () => {
        items.forEach((item) => {
            item.isSelected = true;
            updateItemMutation(item, {
                onSuccess: () => {
                    queryClient.invalidateQueries([
                        "items",
                        cookies.get("authToken"),
                    ]);
                },
            });
        });
    };

    const deselectAll = () => {
        items.forEach((item) => {
            if (item.isSelected) {
                item.isSelected = false;
                updateItemMutation(item, {
                    onSuccess: () => {
                        queryClient.invalidateQueries([
                            "items",
                            cookies.get("authToken"),
                        ]);
                    },
                });
            }
        });
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

    if (loading) {
        return <Spinner />;
    }

    if (isItemsPending || isListItemsPending) {
        return <div>Loading...</div>;
    }

    return typeof cookies.get("authToken") != "undefined" ? (
        <div className="wrapper">
            <NavBar exportAsCSV={exportAsCSV} />
            <div className="dashboard pt-[60px] max-md:pt-[10px]">
                <h1 className="welcome">Welcome {cookies.get("name")}</h1>
                <form
                    className="addItem"
                    onSubmit={(e) => {
                        isEdit ? editItem(e) : handleNewItem(e);
                    }}
                >
                    <div className="inputDiv max-md:flex max-md:flex-col max-md:items-center">
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
                <SearchBar data={items} setSearchedItem={setSearchedItem} />
                {searchedItem.name && (
                    <div className="showResults">
                        <ItemList
                            items={[searchedItem]}
                            handleEdit={handleEdit}
                            itemListHeading="Search Results"
                        />
                    </div>
                )}
                {listItems.length > 0 && (
                    <div className="selected-div">
                        <Link
                            className="selected-link"
                            to="/selected"
                            state={{ listItems: listItems }}
                        >
                            SHOW SELECTED
                        </Link>
                        <button
                            className="selected-link"
                            onClick={() => exportAsCSV(listItems)}
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
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    items={items}
                    itemListHeading={`Your Items (${items.length})`}
                />
            </div>
        </div>
    ) : (
        <Restricted />
    );
}

export default Dashboard;
