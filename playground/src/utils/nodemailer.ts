import nodemailer from "nodemailer";
import { config } from "../config";

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: config.emailFrom,
      pass: config.googleAppPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.emailFrom, // sender address
    to: config.emailTo, // list of receivers
    subject: "Testing email sending from Nodemailer", // Subject line
    text: "Testing this out", // plain text body
    html: "<h1>Greetings from Cthulhu xD</h1>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
