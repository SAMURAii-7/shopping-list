import React, { useEffect } from "react";
import HomeNavBar from "../components/HomeNavBar";
import createItemGif from "../assets/howto-gifs/CreateItem.gif";
import addItemGif from "../assets/howto-gifs/AddItem.gif";
import editItemGif from "../assets/howto-gifs/EditItem.gif";
import deleteItemGif from "../assets/howto-gifs/DeleteItem.gif";
import searchItemGif from "../assets/howto-gifs/SearchItem.gif";
import exportSelectedGif from "../assets/howto-gifs/ExportSelected.gif";
import exportAllGif from "../assets/howto-gifs/ExportAll.gif";
import { pingApi } from "../services/authServices";

const Home = () => {
    useEffect(() => {
        const pingCheck = async () => {
            await pingApi();
        };
        pingCheck();
    }, []);
    return (
        <div className="home-container">
            <HomeNavBar />
            <h1 className="mt-[30px] text-[2.5rem] text-[#3B0D6A] font-bold max-md:text-[2rem] max-md:text-center max-md:mt-[70px]">
                Simplify your shopping with Shopping List
            </h1>
            <h1 className="mt-[50px] text-[1.5rem] text-[#3B0D6A] font-bold max-md:text-center">
                How does Shopping List work?
            </h1>
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Create an item to add to your database of items
                    </h2>
                    <img
                        src={createItemGif}
                        alt="Gif for how to create an item"
                        className="block max-w-[1000px] max-h-[410px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Add an item to your shopping list or press the same
                        button again to remove it from your shopping list
                    </h2>
                    <img
                        src={addItemGif}
                        alt="Gif for how to add an item"
                        className="block max-w-[1000px] max-h-[373px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Edit the item name or quantity
                    </h2>
                    <img
                        src={editItemGif}
                        alt="Gif for how to edit an item"
                        className="block max-w-[1000px] max-h-[373px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Delete an item from the database
                    </h2>
                    <img
                        src={deleteItemGif}
                        alt="Gif for how to delete an item"
                        className="block max-w-[1000px] max-h-[373px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Search an item in your database
                    </h2>
                    <img
                        src={searchItemGif}
                        alt="Gif for how to search an item"
                        className="block max-w-[1000px] max-h-[373px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Export your shopping list to a CSV file
                    </h2>
                    <img
                        src={exportSelectedGif}
                        alt="Gif for how to export the shopping list"
                        className="block max-w-[1000px] max-h-[410px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] max-md:flex-col">
                    <h2 className="text-2xl text-[#3B0D6A] font-bold w-[300px] m-[20px] max-md:text-lg max-md:text-center">
                        Export the entire database of items to a CSV file
                    </h2>
                    <img
                        src={exportAllGif}
                        alt="Gif for how to export the database of items"
                        className="block max-w-[1000px] max-h-[410px] w-auto h-auto mt-[20px] outline outline-1 outline-[#bcb9b9] rounded-lg max-md:max-w-[350px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
