import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, selectedPlan } = req.body;

    // get user from db
    const user: any = await prisma.user.findUnique({
      where: { id },
      include: { subscription: true, customer: true, invoices: true },
    });

    const { subscription, customer, invoices } = user;
    console.log(invoices.reverse()[0]);

    // get latest invoice and delete
    const latestInvoice = invoices.reverse()[0];
    await prisma.invoice.delete({ where: { id: latestInvoice.id } });

    // Delete current stripe subscription
    // await stripe.subscriptions.delete(subscription.subscriptionId);

    res.status(200).send("success");
  } catch {
    res.status(500).send("Error");
  }
};

export default handler;
