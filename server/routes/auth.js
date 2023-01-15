const router = require("express").Router();
const User = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../mail");

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
                res.set("Authorization", `Bearer ${accessToken}`);
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                });
            });
        } else {
            console.log(err);
            res.status(400).send("Email or password is wrong");
        }
    });
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    //check if email exists
    const user = await User.findOne({ email: email });
    if (!user) res.status(400).send("Email or password is wrong");

    //if user exists
    const secret = process.env.RESET_PASSWORD_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://create-shopping-list.vercel.app/reset-password/${user._id}/${token}`;
    sendEmail(email, link);
    res.status(200).send("Password reset link has been sent to your email");
});

router.post("/reset-password", async (req, res) => {
    const { id } = req.body;
    const token = req.headers["authorization"];
    let authToken = "";
    if (token && token.startsWith("Bearer ")) {
        const parts = token.split(" ");
        if (parts.length === 2) {
            authToken = parts[1];
        }
    }
    const user = await User.findOne({ _id: id });
    if (!user) res.status(401).send("Invalid user id");
    const secret = process.env.RESET_PASSWORD_SECRET + user.password;
    try {
        const payload = jwt.verify(authToken, secret);
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        await user.save();
        res.status(200).send("Password Reset Done");
    } catch (err) {
        res.status(401).send("Invalid token");
    }
});

module.exports = router;
