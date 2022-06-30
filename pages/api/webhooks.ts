import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { prisma } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { event } = req.body;
    let user;
    let invoice;

    switch (event.type) {
      case "subscription.payment_succeeded":
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
