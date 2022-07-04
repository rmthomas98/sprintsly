import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, customerId, paymentMethodId } = req.body;

    // get payment method card from stripe
    const card = await stripe.paymentMethods.retrieve(paymentMethodId);
    const { brand, last4, exp_month, exp_year } = card.card;

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // update customer default payment method in stripe
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // get user, customer, card from db
    const user: any = await prisma.user.findUnique({
      where: { id: userId },
      include: { customer: true, card: true },
    });

    // update payment method in db
    await prisma.customer.update({
      where: { id: user.customer.id },
      data: {
        paymentMethod: paymentMethodId,
      },
    });

    // get latest failed invoice from stripe
    const invoice = await stripe.invoices.list({
      customer: customerId,
      limit: 1,
    });

    // get latest failed invoice id
    const invoiceId = invoice.data[0].id;

    // pay invoice in stripe
    await stripe.invoices.pay(invoiceId);

    // update customer paymentStatus in db
    await prisma.customer.update({
      where: { id: user.customer.id },
      data: { paymentStatus: "SUCCESS" },
    });

    // delete exising card in db
    await prisma.card.delete({ where: { id: user?.card?.id } });

    // insert new card in db
    await prisma.card.create({
      data: {
        brand: brand,
        last4: last4,
        month: exp_month,
        year: exp_year,
        userId: user.id,
      },
    });

    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
