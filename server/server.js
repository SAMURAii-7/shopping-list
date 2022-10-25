const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectsToCsv = require("objects-to-csv");
const fs = require("fs");
require("dotenv").config();

//import routes
const itemsRoute = require("./routes/items");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const verify = require("./routes/verifyToken");

const app = express();

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/items", itemsRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

app.get("/api", (req, res) => {
    res.send("Welcome to the server!");
});

app.post("/api/export", verify, async (req, res) => {
    const csv = new ObjectsToCsv(req.body);
    await csv.toDisk("./items.csv");
    res.download("./items.csv", () => {
        fs.unlinkSync("./items.csv");
    });
});

mongoose.connect(process.env.MONGO_URI, () => console.log("DB connected"));
