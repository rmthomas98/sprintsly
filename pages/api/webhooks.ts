import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { prisma } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { event } = req.body;

    if (event.type === "invoice.payment_succeeded") {
      const { customer: stripeCustomer } = event.data.object;
    }

    res.status(200).json({ received: true });
  } catch {
    res.status(200).json({ received: true });
  }
};

export default handler;
