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
    const { firstName, lastName, email, username, password } =
      req.body.accountInfo;
    const paymentMethodId = req.body.setupIntent.setupIntent.payment_method;

    // retrieve payment method object from stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    // get card details from payment method object for db
    const { brand, last4, exp_month, exp_year } = paymentMethod.card;

    // create customer in stripe
    const customer = await stripe.customers.create({
      name: `${firstName.trim()} ${lastName.trim()}`,
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
      items: [{ price: "price_1LCXUWA7aOT5A0f28gNvy0Kd" }],
    });

    // generate secret code
    const secretCode = crypto.randomBytes(6).toString("base64").toUpperCase();

    // create user in db
    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password),
        role: "SUPERADMIN",
        verificationCode: secretCode,
      },
    });

    // create customer in db
    await prisma.customer.create({
      data: {
        customerId: customer.id,
        paymentMethod: paymentMethodId,
        paymentStatus: "SUCCESS",
        userId: user.id,
      },
    });

    // create subscription in db
    await prisma.subscription.create({
      data: {
        subscriptionId: subscription.id,
        subscriptionItem: subscription.items.data[0].id,
        type: "PERSONAL",
        tier: "PRO",
        userId: user.id,
      },
    });

    // create payment card in db
    await prisma.card.create({
      data: {
        brand: brand,
        last4: last4,
        month: exp_month,
        year: exp_year,
        userId: user.id,
      },
    });

    // send response back to frontend
    res.status(200).send("success");
  } catch {
    res.status(500).send("error");
  }
};

export default handler;
