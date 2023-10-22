const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const ObjectsToCsv = require("objects-to-csv");
const fs = require("fs");
require("dotenv").config();

//import routes
const itemsRoute = require("./routes/items");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const verify = require("./routes/verifyToken");

const app = express();

app.use(compression());
app.use(
    cors({
        origin: /https:\/\/[A-Za-z0-9-]+\.vercel\.app$/,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Authorization", "Content-Type"],
        exposedHeaders: ["Authorization"],
        credentials: true,
    })
);
// for development
// app.use(cors({ origin: "https://create-shopping-list.vercel.app" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/items", itemsRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 8080;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

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

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}...`);
    });
});
