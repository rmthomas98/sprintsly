import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // create a setup intent
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
    });

    // send client secret back to frontend
    res.status(200).json({ clientSecret: setupIntent.client_secret });
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
