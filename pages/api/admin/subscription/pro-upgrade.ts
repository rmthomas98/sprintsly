import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user, paymentMethodId, selectedPlan } = req.body;
    const { id: customerId } = user.customer;
    const { customerId: stripeCustomerId } = user.customer;
    const { id: subscriptionId } = user.subscription;

    // get payment method card details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const { brand, last4, exp_month, exp_year } = paymentMethod.card;
    console.log(brand, last4, exp_month, exp_year);

    // attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomerId,
    });

    // update customer in stripe
    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
      metadata: {
        user_id: user.id,
        plan: selectedPlan === "personal-pro" ? "personal" : "teams",
        tier: selectedPlan === "personal-pro" ? "pro" : "team",
      },
    });

    // create subscription for customer
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
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
      where: { id: customerId },
      data: {
        paymentMethod: paymentMethodId,
        paymentStatus: "SUCCESS",
      },
    });

    // update subscription in db
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        subscriptionId: subscription.id,
        subscriptionItem: subscription.items.data[0].id,
        type: selectedPlan === "personal-pro" ? "PERSONAL" : "TEAMS",
        tier: "PRO",
        nextInvoice: subscription.current_period_end.toString(),
      },
    });

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
      customer: stripeCustomerId,
      limit: 1,
    });

    // retrive latest invoice for customer
    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      customer: stripeCustomerId,
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
