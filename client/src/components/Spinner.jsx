import spinner from "../assets/spinner.gif";

function Spinner() {
    return (
        <div className="spinner-div flex flex-col items-center justify-center">
            <img
                width={180}
                className="spinner-img"
                src={spinner}
                alt="Loading..."
            />
            <p className="text-center text-2xl pt-[20px] w-full max-md:text-xl">
                Please wait for the server to startup...
            </p>
        </div>
    );
}

export default Spinner;
