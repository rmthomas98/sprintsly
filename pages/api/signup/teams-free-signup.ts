import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  teamName: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const prisma = new PrismaClient();
    const { firstName, lastName, email, username, teamName, password } =
      req.body;

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
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
    });

    // create team in postgres
    const team = await prisma.team.create({
      data: {
        name: teamName,
      },
    });

    // create user in postgres
    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password),
        role: "ADMIN",
        teamId: team.id,
        verificationCode: crypto
          .randomBytes(6)
          .toString("base64")
          .toUpperCase(),
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

    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
