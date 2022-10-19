const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: false,
    },
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Item", itemSchema);
