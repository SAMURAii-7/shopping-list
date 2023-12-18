const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = function sendEmail(email, link) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_PASS,
        },
    });

    const details = {
        from: process.env.SENDER_MAIL,
        to: email,
        subject: "Password Reset Link",
        text: "Password Reset Link: " + link,
        html:
            "<h1>Password Reset Link</h1><p>Click on the link to reset your password: <a href=" +
            link +
            ">Reset Password</a></p>",
    };

    transporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully");
        }
    });
};
