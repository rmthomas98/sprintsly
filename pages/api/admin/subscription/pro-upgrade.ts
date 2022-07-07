import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, selectedPlan, paymentMethodId } = req.body;

    const user: any = await prisma.user.findUnique({
      where: { id },
      include: { customer: true, subscription: true, card: true },
    });
    const { customer } = user;
    const { subscription } = user;

    // get payment method card details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const { brand, last4, exp_month, exp_year } = paymentMethod.card;

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.customerId,
    });

    // update customer in stripe
    await stripe.customers.update(customer.customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
      metadata: {
        user_id: user.id,
        plan: selectedPlan === "personal-pro" ? "personal" : "teams",
        tier: "pro",
      },
    });

    // create subscription for customer
    const stripeSubscription = await stripe.subscriptions.create({
      customer: customer.customerId,
      items: [
        {
          price:
            selectedPlan === "personal-pro"
              ? "price_1LCXUWA7aOT5A0f28gNvy0Kd"
              : "price_1LCWWLA7aOT5A0f2uxbA1BqY",
        },
      ],
    });

    // update customer in db
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        paymentMethod: paymentMethodId,
        paymentStatus: "SUCCESS",
      },
    });

    // update subscription in db
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        subscriptionId: stripeSubscription.id,
        subscriptionItem: stripeSubscription.items.data[0].id,
        type: selectedPlan === "personal-pro" ? "PERSONAL" : "TEAMS",
        tier: "PRO",
        nextInvoice: stripeSubscription.current_period_end.toString(),
      },
    });

    // delete existing cards in db
    if (user.card) await prisma.card.delete({ where: { id: user.card.id } });

    // create payment card in db
    await prisma.card.create({
      data: {
        brand: brand,
        last4: last4,
        month: exp_month,
        year: exp_year,
        userId: user.id,
      },
    });

    // retreive latest invoice for customer
    const invoice = await stripe.invoices.list({
      customer: customer.customerId,
      limit: 1,
    });

    // retrive latest invoice for customer
    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      customer: customer.customerId,
    });

    // create invoices in db
    await prisma.invoice.createMany({
      data: [
        {
          invoiceId: invoice.data[0].id,
          date: invoice.data[0].period_start.toString(),
          amountDue: invoice.data[0].amount_due.toString(),
          amountPaid: invoice.data[0].amount_paid.toString(),
          url: invoice.data[0].hosted_invoice_url,
          status: invoice.data[0].status,
          userId: user.id,
        },
        {
          invoiceId: upcomingInvoice.lines.data[0].id,
          date: upcomingInvoice.period_end.toString(),
          amountDue: upcomingInvoice.amount_due.toString(),
          amountPaid: upcomingInvoice.amount_paid.toString(),
          status: upcomingInvoice.status,
          userId: user.id,
        },
      ],
    });

    res.status(200).send("success");
  } catch {
    res.status(500).send("Error");
  }
};

export default handler;
