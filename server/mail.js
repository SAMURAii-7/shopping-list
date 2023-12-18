const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports = function sendEmail(email, link) {
    const accessToken = oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.SENDER_MAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
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
        transporter.close();
    });
};
