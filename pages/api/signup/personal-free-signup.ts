import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/db";
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");
const nodemailer = require("nodemailer");

interface Account {
  name: string;
  email: string;
  username: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const { name, email, username, password }: Account = req.body;

    // check if email is taken
    const isEmailTaken = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isEmailTaken) return res.status(200).send("email");

    // check if username is taken
    const isUsernameTaken = await prisma.user.findUnique({
      where: { username: username },
    });
    if (isUsernameTaken) return res.status(200).send("username");

    // create customer in stripe
    const stripeCustomer = await stripe.customers.create({
      name: name.trim(),
      email: email.trim(),
    });

    // generate secret code
    const secretCode = crypto.randomBytes(6).toString("base64").toUpperCase();

    // create user in postgres
    const customer = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password),
        role: "SUPERADMIN",
        verificationCode: secretCode,
      },
    });

    // create customer in postgres
    await prisma.customer.create({
      data: {
        customerId: stripeCustomer.id,
        paymentStatus: "SUCCESS",
        userId: customer.id,
      },
    });

    // create subscription in postgres
    await prisma.subscription.create({
      data: {
        type: "PERSONAL",
        tier: "FREE",
        userId: customer.id,
      },
    });

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
          <p style="font-size: 14px; margin-bottom: 10px;">Dear ${name.trim()},</p>
          <p style="font-size: 14px;">You are one step away from setting up your account and using our services! Copy the secret code below and enter it to verify your email.</p>
          <p style="margin-top: 10px; font-size: 30px;">${secretCode}</p>
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
