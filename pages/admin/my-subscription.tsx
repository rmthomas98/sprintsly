import { getSession } from "next-auth/react";
import { prisma } from "../../lib/db";

const MySubscription = () => {
  return <div>my subscription</div>;
};

export const getSererSideProps = async (ctx: any) => {
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
  let user: any = await prisma.user.findUnique({
    where: { id },
    include: { subscription: true },
  });

  if (!user?.subscription) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  user = { name: user.name };

  return {
    props: {},
  };
};

export default MySubscription;
