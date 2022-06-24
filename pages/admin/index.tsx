import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const Index = () => {
  return <div></div>;
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
  const prisma = new PrismaClient();
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
