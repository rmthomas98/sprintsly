import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // init prisma
    const prisma = new PrismaClient();

    // get data from frontend
    const { name, email, username, teamName, password } = req.body.accountInfo;
    const paymentMethodId = req.body.setupIntent.setupIntent.payment_method;

    // get payment method object from stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    // get card details from payment method object
    const { brand, last4, exp_month, exp_year } = paymentMethod.card;

    // create customer in stripe
    const customer = await stripe.customers.create({
      name: name.trim(),
      email: email.trim(),
    });

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // update customer to default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // create subscription in stripe
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "price_1LCWWLA7aOT5A0f2uxbA1BqY" }],
    });

    // create team in db
    const team = await prisma.team.create({
      data: {
        name: teamName.trim(),
      },
    });

    // generate secret code
    const secretCode = crypto.randomBytes(6).toString("base64").toUpperCase();

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password),
        verificationCode: secretCode,
        role: "SUPERADMIN",
        teamId: team.id,
      },
    });

    await prisma.customer.create({
      data: {
        customerId: customer.id,
        paymentMethod: paymentMethodId,
        paymentStatus: "SUCCESS",
        userId: user.id,
      },
    });

    await prisma.subscription.create({
      data: {
        subscriptionId: subscription.id,
        subscriptionItem: subscription.items.data[0].id,
        type: "TEAMS",
        tier: "PRO",
        userId: user.id,
      },
    });

    await prisma.card.create({
      data: {
        brand: brand,
        last4: last4,
        month: exp_month,
        year: exp_year,
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
