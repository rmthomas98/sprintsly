import { PrismaClientRustPanicError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, customerId, paymentMethodId } = req.body;

    // get payment method card details
    const card = await stripe.paymentMethods.retrieve(paymentMethodId);
    const { brand, last4, exp_month, exp_year } = card.card;

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // update defaul payment method for stripe customer
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // get user from db
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { customer: true, card: true },
    });

    // delete existing card attached to user in db
    await prisma.card.delete({ where: { id: user?.card?.id } });

    // create new card in db
    await prisma.card.create({
      data: {
        brand: brand,
        last4: last4,
        month: exp_month,
        year: exp_year,
        userId: userId,
      },
    });

    // update customer in db with updated payment method
    await prisma.customer.update({
      where: { id: user?.customer?.id },
      data: { paymentMethod: paymentMethodId },
    });

    // return success message
    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
