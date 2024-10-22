
import { Router } from "express";
import { errMsg } from '../models/index.js';

import nodemailer from 'nodemailer'

import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') })



const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 465,
    service: "gmail",
    // secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
  });
  


const MailingRouter = Router()




MailingRouter.post("/send", async (req, res) => {
    try {

        // const {mail} = req.body; 
        const mailOptions = {
            from: "no-reply@gmail.com",
            to: 'abdellali.aitaddi@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: "<h1>hello world</h1>"
        };

        const resp = await transporter.sendMail(mailOptions)
        return res.json({
            message: "works"
        })

    }catch(e) {
        console.error(e)
        return errMsg(res, e)
    }

})



export default MailingRouter;