import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // init prisma
    const prisma = new PrismaClient();

    // get email from frontend
    const { email } = req.body;

    // get user from db
    const user = await prisma.user.findUnique({ where: { email } });
    // if no user is found send error to front end
    if (!user) return res.status(200).send("email not found");

    // create email with secret code for email verification
    const transporter = nodemailer.createTransport({
      host: "smtppro.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: "support@sprintsly.io",
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    const msg = {
      from: '"Sprintsly" <support@sprintsly.io>',
      to: email,
      subject: "Verify Your Email",
      html: `<html>
        <body>
          <p style="font-size: 14px; margin-bottom: 10px;">Dear valued Sprintsly user,</p>
          <p style="font-size: 14px;">You are one step away from setting up your account and using our services! Copy the secret code below and enter it to verify your email.</p>
          <p style="margin-top: 10px; font-size: 30px;">${user.verificationCode}</p>
          <p style="margin-top: 10px; font-size: 14px">Regards,</p>
          <p style="margin-top: 5px; font-size: 14px">The Sprintsly Team</p>
        </body>
      </html>`,
    };

    // attempt to send email
    try {
      await transporter.sendMail(msg);
      res.status(200).json("success");
    } catch {
      res.status(200).json("error");
    }
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
