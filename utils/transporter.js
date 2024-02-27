import {} from 'dotenv/config'
import nodemailer from 'nodemailer'
import config from '../config.js';

const sendername = config.mail.user;
const senderpass = config.mail.pass;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: sendername,
    pass: senderpass,
  },
});

export default async function send_mail(to, body, subject){
    transporter.verify().then(console.log).catch(console.error);

    transporter.sendMail({
        from: config.mail.from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
      }).then(info => {
        console.log({info});
      }).catch(console.error);
}
