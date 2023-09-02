const nodemailer = require("nodemailer");
const asynHandler = require("express-async-handler");

const sendEmail = asynHandler(async (data, req, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          
          user: process.env.MAIL_ID,
          pass: process.env.MP,
        }
      });
      
      
      async function main() {
        
        const info = await transporter.sendMail({
          from: '"Hey" <abc@gmail.com>', 
          to: data.to, 
          subject: data.subject, 
          text: data.text, 
          html: data.htm, 
        });
      
        console.log("Message sent: %s", info.messageId);
      }

});

module.exports = sendEmail;