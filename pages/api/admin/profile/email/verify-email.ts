import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, id, code } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { customer: true },
    });
    console.log(user?.role);

    if (user?.role === "SUPERADMIN") {
      await stripe.customers.update(user?.customer?.customerId, {
        email: email,
      });
    }

    if (user?.verificationCode !== code.trim()) {
      return res.status(200).send("invalid code");
    }

    await prisma.user.update({
      where: { id },
      data: { email },
    });

    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
