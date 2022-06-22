import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");
const nodemailer = require("nodemailer");

interface Account {
  name: string;
  email: string;
  username: string;
  teamName: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const prisma = new PrismaClient();
    const { name, email, username, teamName, password } = req.body;

    // check if email is already in use
    const isEmailTaken = await prisma.user.findUnique({
      where: { email: email },
    });
    if (isEmailTaken) return res.status(200).send("email");

    // check if username is already in use
    const isUsernameTaken = await prisma.user.findUnique({
      where: { username: username },
    });
    if (isUsernameTaken) return res.status(200).send("username");

    // create customer in stripe
    const stripeCustomer = await stripe.customers.create({
      name: name.trim(),
      email: email.trim(),
    });

    // create team in postgres
    const team = await prisma.team.create({
      data: {
        name: teamName,
      },
    });

    // generate secret code
    const secretCode = crypto.randomBytes(6).toString("base64").toUpperCase();

    // create user in postgres
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password),
        role: "SUPERADMIN",
        teamId: team.id,
        verificationCode: secretCode,
      },
    });

    // create customer in postgres
    await prisma.customer.create({
      data: {
        customerId: stripeCustomer.id,
        paymentStatus: "SUCCESS",
        userId: user.id,
      },
    });

    // create subscription in postgres
    await prisma.subscription.create({
      data: {
        type: "TEAMS",
        tier: "FREE",
        userId: user.id,
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
