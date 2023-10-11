import spinner from "../assets/spinner.gif";

function Spinner() {
    return (
        <div className="spinner-div">
            <img
                width={180}
                className="spinner-img"
                src={spinner}
                alt="Loading..."
            />
            <p className="text-center w-full">
                Please wait for the server to startup...
            </p>
        </div>
    );
}

export default Spinner;
