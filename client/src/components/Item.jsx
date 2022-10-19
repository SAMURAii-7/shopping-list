function Item({ item }) {
    return (
        <div>
            <h3>{item.name}</h3>
            <p>{item.quantity}</p>
        </div>
    );
}

export default Item;
