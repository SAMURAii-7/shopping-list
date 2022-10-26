const router = require("express").Router();
const User = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//validation
const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
    //validate data before creating a user
    const validation = registerSchema.validate(req.body);
    if (validation.error)
        res.status(400).send(validation.error.details[0].message);
    else {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        try {
            await user.save((err, user) => {
                if (user) {
                    res.send({ user: user._id });
                } else {
                    res.send(err.errors.email.message);
                }
            });
        } catch {
            res.status(400).send(err);
        }
    }
});

router.post("/login", async (req, res) => {
    const validation = loginSchema.validate(req.body);
    if (validation.error)
        res.status(400).send(validation.error.details[0].message);

    //check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Email or password is wrong");

    //check if password is correct
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            //create and assign a token
            const accessToken = jwt.sign(
                { _id: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            User.findOne({ email: req.body.email }).then((user) => {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                });
            });
        } else {
            res.status(400).send("Email or password is wrong");
        }
    });
});

module.exports = router;
