const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//import routes
const itemsRoute = require("./routes/items");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/items", itemsRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

app.get("/api", (req, res) => {
    res.send("Welcome to the server!");
});

mongoose.connect("mongodb://localhost:27017/shopping", () =>
    console.log("DB connected")
);
