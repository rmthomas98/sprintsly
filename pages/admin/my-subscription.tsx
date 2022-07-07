import { getSession } from "next-auth/react";
import { prisma } from "../../lib/db";
import { SubscriptionContainer } from "../../components/Admin/Subscription/SubscriptionContainer/SubscriptionContainer";

const MySubscription = ({ user }: any) => {
  console.log(user);
  return (
    <>
      <SubscriptionContainer user={user} />
    </>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const id: any = session.id;
  const user: any = await prisma.user.findUnique({
    where: { id },
    include: { subscription: true, card: true, customer: true, invoices: true },
  });

  if (!user.subscription || user.role !== "SUPERADMIN") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const subscription = {
    type: user.subscription.type,
    tier: user.subscription.tier,
    cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd,
    quantity: user.subscription.quantity,
    nextInvoice: user.subscription.nextInvoice || null,
  };

  let invoices;

  if (invoices !== []) {
    invoices = user.invoices.map((invoice: any) => {
      return {
        date: invoice.date,
        amountDue: invoice.amountDue,
        amountPaid: invoice.amountPaid,
        url: invoice.url,
        status: invoice.status,
      };
    });
  } else {
    invoices = [];
  }

  const customer = { paymentStatus: user.customer.paymentStatus };

  let card;
  if (user.card) {
    const { brand, last4, month, year } = user.card;
    card = {
      brand,
      last4,
      month,
      year,
    };
  } else {
    card = null;
  }

  return {
    props: { user: { subscription, customer, invoices, card } },
  };
};

export default MySubscription;
