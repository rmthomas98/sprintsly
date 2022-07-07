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

    // get payment method card from stripe
    const card = await stripe.paymentMethods.retrieve(paymentMethodId);
    const { brand, last4, exp_month, exp_year } = card.card;

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.customerId,
    });

    // update customer default payment method in stripe
    await stripe.customers.update(customer.customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // update payment method in db
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        paymentMethod: paymentMethodId,
      },
    });

    // get latest failed invoice from stripe
    const invoice = await stripe.invoices.list({
      customer: customer.customerId,
      limit: 1,
    });

    // get latest failed invoice id
    const invoiceId = invoice.data[0].id;

    // pay invoice in stripe
    await stripe.invoices.pay(invoiceId);

    // update customer paymentStatus in db
    await prisma.customer.update({
      where: { id: customer.id },
      data: { paymentStatus: "SUCCESS" },
    });

    // delete exising card in db
    if (user.card) await prisma.card.delete({ where: { id: user.card.id } });

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
