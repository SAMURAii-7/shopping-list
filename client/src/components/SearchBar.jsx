import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({ data, handleSearch }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        handleSearch({});
    };

    const selectSearchedItem = (item) => {
        handleSearch({
            _id: item._id,
            isSelected: item.isSelected,
            name: item.name,
            quantity: item.quantity,
            user_id: item.user_id,
        });
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Search Item..."
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <FaSearch color="rebeccapurple" />
                    ) : (
                        <FaTimes
                            color="rebeccapurple"
                            id="clearBtn"
                            onClick={clearInput}
                        />
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((value) => {
                        return (
                            <p
                                key={value._id}
                                onClick={() => selectSearchedItem(value)}
                            >
                                {value.name}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
