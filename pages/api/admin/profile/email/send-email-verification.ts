import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/db";
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, email } = req.body;
    const secretCode = crypto.randomBytes(4).toString("hex").toUpperCase();
    console.log(id, email);

    const isEmailTaken = await prisma.user.findUnique({ where: { email } });
    if (isEmailTaken) return res.status(200).send("email in use");

    const user = await prisma.user.findUnique({ where: { id } });

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
          <p style="font-size: 14px; margin-bottom: 10px;">Dear ${user?.name},</p>
          <p style="font-size: 14px;">You are receiving this email because you have requested to update your email. Copy the code below and enter it in the prompt to verify your email.</p>
          <p style="margin-top: 10px; font-size: 30px;">${secretCode}</p>
          <p style="margin-top: 10px; font-size: 14px">Regards,</p>
          <p style="margin-top: 5px; font-size: 14px">The Sprintsly Team</p>
        </body>
      </html>`,
    };

    try {
      await transporter.sendMail(msg);
      await prisma.user.update({
        where: { id },
        data: { verificationCode: secretCode },
      });
      res.status(200).send("success");
    } catch {
      res.status(500).send("error");
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
