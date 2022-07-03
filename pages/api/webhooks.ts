import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { prisma } from "../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const event = req.body;

    if (event.type === "invoice.payment_succeeded") {
      // Don't do anything if this is the user signing up
      // Everything is already taken care of in the signup endpoints
      if (event.data.object.billing_reason === "subscription_create") {
        return res.status(200).json({ received: true });
      }

      // get stripe customer id and invoice id from event
      const { customer: stripeCustomerId } = event.data.object;
      const { id: invoiceId } = event.data.object;
      // retreive customer from stripe
      const stripeCustomer = await stripe.customers.retrieve(stripeCustomerId);
      // get metadata from customer in stripe which contatins the user id
      const { metadata } = stripeCustomer;
      // declare user id from metadata so we can do lookup in db
      const { user_id: userId } = metadata;

      // retreive user from db including customer
      const user: any = await prisma.user.findUnique({
        where: { id: Number(userId) },
        include: { customer: true, subscription: true },
      });

      // get customer attached to user in db
      const { customer } = user;
      // get subscription attached to customer in db
      const { subscription } = customer;

      // update customer payment status to paid
      await prisma.customer.update({
        where: { id: customer.id },
        data: {
          paymentStatus: "SUCCESS",
        },
      });

      // update subscription next invoice date to next month
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          nextInvoice: event.data.object.period_end.toString(),
        },
      });

      // delete exising draft invoice
      await prisma.invoice.delete({ where: { id: invoiceId } });

      // retreive upcoming invoice from stripe for next invoice
      const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        customer: stripeCustomerId,
      });

      // create new invoice that the customer just paid
      // and create new invoice for next month
      await prisma.invoice.createMany({
        data: [
          {
            invoiceId: invoiceId,
            date: event.data.object.period_end.toString(),
            amountDue: event.data.object.amount_due.toString(),
            amountPaid: event.data.object.amount_paid.toString(),
            url: event.data.object.hosted_invoice_url,
            status: event.data.object.status,
            userId: Number(userId),
          },
          {
            invoiceId: upcomingInvoice.lines.data[0].id,
            date: upcomingInvoice.period_end.toString(),
            amountDue: upcomingInvoice.amount_due.toString(),
            amountPaid: upcomingInvoice.amount_paid.toString(),
            status: upcomingInvoice.status,
            userId: Number(userId),
          },
        ],
      });
    } else if (event.type === "invoice.payment_failed") {
      // get stripe customer id and invoice id from event
      const { customer: stripeCustomerId } = event.data.object;
      const { id: invoiceId } = event.data.object;
      // retreive customer from stripe
      const stripeCustomer = await stripe.customers.retrieve(stripeCustomerId);
      // get metadata from customer in stripe which contatins the user id
      const { metadata } = stripeCustomer;
      // declare user id from metadata so we can do lookup in db
      const { user_id: userId } = metadata;

      // get user from db along with customer and subscription model
      const user: any = await prisma.user.findUnique({
        where: { id: Number(userId) },
        include: { customer: true, subscription: true },
      });

      // get customer attached to user in db
      const { customer } = user;

      // update customer payment status to failed
      await prisma.customer.update({
        where: { id: customer.id },
        data: { paymentStatus: "FAILED" },
      });

      // delete exising draft invoice
      await prisma.invoice.delete({ where: { id: invoiceId } });

      // insert failed payment invoice
      await prisma.invoice.create({
        data: {
          invoiceId: invoiceId,
          date: event.data.object.period_end.toString(),
          amountDue: event.data.object.amount_due.toString(),
          amountPaid: event.data.object.amount_paid.toString(),
          status: "Failed",
          userId: Number(userId),
        },
      });
    }

    res.status(200).json({ received: true });
  } catch {
    res.status(200).json({ received: true });
  }
};

export default handler;
