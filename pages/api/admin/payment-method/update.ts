import { PrismaClientRustPanicError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, paymentMethodId } = req.body;

    const user: any = await prisma.user.findUnique({
      where: { id },
      include: { customer: true, card: true },
    });
    const { customer } = user;

    // get payment method card details
    const card = await stripe.paymentMethods.retrieve(paymentMethodId);
    const { brand, last4, exp_month, exp_year } = card.card;

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.customerId,
    });

    // update defaul payment method for stripe customer
    await stripe.customers.update(customer.customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // delete existing card attached to user in db
    if (user.card) await prisma.card.delete({ where: { id: user.card.id } });

    // create new card in db
    await prisma.card.create({
      data: {
        brand: brand,
        last4: last4,
        month: exp_month,
        year: exp_year,
        userId: id,
      },
    });

    // update customer in db with updated payment method
    await prisma.customer.update({
      where: { id: customer.id },
      data: { paymentMethod: paymentMethodId },
    });

    // return success message
    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
