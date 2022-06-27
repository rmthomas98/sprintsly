import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, id } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (user?.role === "SUPERADMIN") {
      await stripe.customers.update(user?.customer?.customerId, {
        name: name,
      });
    }

    await prisma.user.update({
      where: { id },
      data: { name },
    });

    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
