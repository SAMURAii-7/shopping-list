import { FaEdit, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import { updateItem } from "../services/itemsServices";
import Cookies from "universal-cookie";
import { useEffect } from "react";

function Item({
    item,
    handleEdit,
    handleDelete,
    handleNewListAdd,
    handleNewListRemove,
}) {
    const cookies = new Cookies();

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (item.isSelected) {
            setIsClicked(true);
        }
        // eslint-disable-next-line
    }, []);

    const handleAdd = async (item) => {
        item.isSelected = !isClicked;
        const res = await updateItem(item, cookies.get("authToken"));
        item = res.data;
        setIsClicked(!isClicked);
        handleNewListAdd(item);
    };

    const handleRemove = async (item) => {
        item.isSelected = !isClicked;
        const res = await updateItem(item, cookies.get("authToken"));
        item = res.data;
        setIsClicked(!isClicked);
        handleNewListRemove(item);
    };

    return (
        <div className="item">
            <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.quantity}</p>
            </div>
            <div>
                {!item.isSelected ? (
                    <button onClick={() => handleAdd(item)} className="add">
                        <FaPlus color="rebeccapurple" />
                    </button>
                ) : (
                    <button onClick={() => handleRemove(item)} className="add">
                        <FaMinus color="rebeccapurple" />
                    </button>
                )}
                <button onClick={() => handleEdit(item)} className="edit">
                    <FaEdit color="rebeccapurple" />
                </button>
                <button
                    onClick={() => handleDelete(item._id)}
                    className="delete"
                >
                    <FaTimes color="rebeccapurple" />
                </button>
            </div>
        </div>
    );
}

export default Item;
