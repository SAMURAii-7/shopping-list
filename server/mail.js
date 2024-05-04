const sgMail = require('@sendgrid/mail')
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports = function sendEmail(email, link) {

    const msg = {
        to: email,
        from: 'projects@shubhamprasad.dev',
        subject: 'Password Reset Link',
        text: "Password Reset Link: " + link,
        html: "<h1>Password Reset Link</h1><p>Click on the link to reset your password: <a href=" + link + ">Reset Password</a></p>",
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
};
