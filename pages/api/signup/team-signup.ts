import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // init prisma
    const prisma = new PrismaClient();

    // get data from frontend
    const { firstName, lastName, email, username, teamName, password } =
      req.body.accountInfo;
    const paymentMethodId = req.body.setupIntent.setupIntent.paymentMethod;

    // get payment method object from stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    // get card details from payment method object
    const { brand, last4, exp_month, exp_year } = paymentMethod.card;

    // create customer in stripe
    const customer = await stripe.customers.create({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
    });
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
