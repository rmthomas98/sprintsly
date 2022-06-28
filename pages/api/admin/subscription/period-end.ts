import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, periodEndAction, subscriptionId } = req.body;
    console.log(id, periodEndAction, subscriptionId);

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: periodEndAction,
    });

    console.log(subscription);

    await prisma.subscription.update({
      where: { id },
      data: { cancelAtPeriodEnd: periodEndAction },
    });

    if (periodEndAction) {
      res
        .status(200)
        .send(
          "Subscription will be cancelled at the end of the billing period"
        );
    } else {
      res
        .status(200)
        .send(
          "Subscription will not be cancelled at the end of the billing period"
        );
    }
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
