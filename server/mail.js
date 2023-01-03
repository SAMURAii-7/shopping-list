const sgMail = require("@sendgrid/mail");

function sendEmail(email, link) {
    sgMail.setApiKey(process.env.SHOPPING_LIST_MAIL);
    const message = {
        to: email,
        from: process.env.SENDER_MAIL,
        subject: "Password Reset Link",
        text: "Link to reset your password: " + link,
        html: "<p>Link to reset your password: " + link + "</p>",
    };

    sgMail
        .send(message)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports = sendEmail;
