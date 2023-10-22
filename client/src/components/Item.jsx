import { FaTimes, FaPlus, FaMinus, FaPen } from "react-icons/fa";
import { updateItem } from "../services/itemsServices";
import Cookies from "universal-cookie";
import { useQueryClient, useMutation } from "@tanstack/react-query";

function Item({ item, handleEdit, handleDelete }) {
    const cookies = new Cookies();
    const queryClient = useQueryClient();

    const { mutate: addRemoveItemToggleMutation } = useMutation({
        mutationFn: (item) => updateItem(item, cookies.get("authToken")),
    });

    const handleAdd = async (item) => {
        item.isSelected = true;
        addRemoveItemToggleMutation(item, {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "items",
                    cookies.get("authToken"),
                ]);
            },
        });
    };

    const handleRemove = async (item) => {
        item.isSelected = false;
        addRemoveItemToggleMutation(item, {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "items",
                    cookies.get("authToken"),
                ]);
            },
        });
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
                    <FaPen color="rebeccapurple" />
                </button>
                {handleDelete !== undefined && (
                    <button
                        onClick={() => handleDelete(item._id)}
                        className="delete"
                    >
                        <FaTimes color="rebeccapurple" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Item;
