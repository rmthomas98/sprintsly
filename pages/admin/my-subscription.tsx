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
    include: { subscription: true, card: true, customer: true },
  });

  const { subscription } = user;
  const { card } = user;
  const { customer } = user;

  if (!subscription || user.role !== "SUPERADMIN") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: { subscription, customer, card } },
  };
};

export default MySubscription;
