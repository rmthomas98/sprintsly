import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { prisma } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { event } = req.body;

    if (event.type === "invoice.payment_succeeded") {
      const { customer: stripeCustomer } = event.data.object;
      const customer = await prisma.customer.findFirst({
        where: { customerId: stripeCustomer },
        include: { user: true },
      });
      const user = customer?.user;
    }
  } catch {
    res.status(500).json({ recieved: true });
  }
};

export default handler;
