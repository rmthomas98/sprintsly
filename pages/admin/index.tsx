import { getSession } from "next-auth/react";
import { prisma } from "../../lib/db";

const Index = () => {
  return <div>overview</div>;
};

export const getServerSideProps = async (ctx: any) => {
  // get session
  const session = await getSession(ctx);
  // if no session redirect to login
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // if session pull user from db
  const id: any = session.id;
  const user = await prisma.user.findUnique({ where: { id } });

  // check if user has verified email
  if (!user?.emailVerified) {
    return {
      redirect: {
        destination: "/admin/verify-email",
        permanant: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Index;
