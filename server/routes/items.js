const express = require("express");
const Item = require("../models/Item");
const verify = require("./verifyToken");

const router = express.Router();

router.get("/", verify, async (req, res) => {
    const item = await Item.find({ user_id: req.query.user_id });
    res.send(item);
});

router.post("/create", verify, async (req, res) => {
    const item = await Item.create({
        _id: req.body._id,
        user_id: req.user._id,
        name: req.body.name,
        quantity: req.body.quantity,
    });
    res.send(item);
});

router.put("/:id", verify, async (req, res) => {
    await Item.findOneAndUpdate({ _id: req.params.id }, req.body);
    const item = await Item.findById(req.params.id);
    res.send(item);
});

router.delete("/:id", verify, async (req, res) => {
    const item = await Item.findByAndDelete(req.params.id);
    res.send(item);
});

module.exports = router;
