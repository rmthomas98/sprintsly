import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, periodEndAction } = req.body;

    const user: any = await prisma.user.findUnique({
      where: { id },
      include: { subscription: true },
    });
    const { subscription } = user;

    await stripe.subscriptions.update(subscription.subscriptionId, {
      cancel_at_period_end: periodEndAction,
    });

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: periodEndAction },
    });

    if (periodEndAction) {
      res.status(200).json({
        status: "success",
        message:
          "Subscription will be cancelled at the end of the billing period",
      });
    } else {
      res.status(200).json({
        status: "success",
        message:
          "Subscription will not be cancelled at the end of the billing period",
      });
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
