import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const prisma = new PrismaClient();

    const { firstName, lastName, email, username, password }: Account =
      req.body;

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
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
    });

    // create user in postgres
    const customer = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password),
        role: "ADMIN",
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

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
