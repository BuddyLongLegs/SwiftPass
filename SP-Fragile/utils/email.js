var nodemailer = require("nodemailer");
require("dotenv/config");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY,
  },
});

const notify = (email, subject, body, html) => {
  body = body || "";
  html = html || "";
  var mailOptions = {
    from: `Swift-Pass ${process.env.EMAIL}>`,
    to: email,
    subject: subject,
    text: body,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log("Email sent to: " + email);
    }
  });
};

module.exports.notify = notify;
