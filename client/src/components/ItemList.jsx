import React from "react";
import Item from "./Item";
const ItemList = ({ items, handleEdit, handleDelete, itemListHeading }) => {
    return (
        <div className="items-list">
            <h2 className="itemsListHeader">{itemListHeading}</h2>
            {typeof items === "undefined" || items.length === 0 ? (
                <p>No items found</p>
            ) : (
                items.map((item) => (
                    <Item
                        key={item._id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        item={item}
                    />
                ))
            )}
        </div>
    );
};

export default ItemList;
