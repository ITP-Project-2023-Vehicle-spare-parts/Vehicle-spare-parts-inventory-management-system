const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
const transporter = nodemailer.createTransport({
    service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MP,
        }
      });
      
        let info = await transporter.sendMail({
            from: '"Hey👻" <foo@gmail.com>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.text, // plain text body
            html: data.htm, // html body

      });
        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


});

module.exports = sendEmail;