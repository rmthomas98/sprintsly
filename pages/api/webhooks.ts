import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { prisma } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const event = req.body;

    if (event.type === "invoice.payment_succeeded") {
      const { customer: stripeCustomerId } = event.data.object;
      const stripeCustomer = await stripe.customers.retrieve(stripeCustomerId);
      const { metadata } = stripeCustomer;
      const { user_id: id } = metadata;

      const user = await prisma.user.findUnique({
        where: { id: id },
        include: { customer: true, invoices: true, subscription: true },
      });

      const { customer } = user;
      const { invoices } = user;
      const subscription = user;
    }

    res.status(200).json({ received: true });
  } catch {
    res.status(200).json({ received: true });
  }
};

export default handler;
