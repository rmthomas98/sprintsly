import { VerifyEmailForm } from "../../components/Admin/VerifyEmailForm/VerifyEmailForm";
import { prisma } from "../../lib/db";
import { getSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const VerifyEmail = ({ id }: any) => {
  return (
    <>
      <VerifyEmailForm id={id} />
      <Toaster />
    </>
  );
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

  // check if user is already verified
  if (user?.emailVerified) {
    return {
      redirect: {
        destination: "/admin",
        permanant: false,
      },
    };
  }

  return {
    props: { id },
  };
};

export default VerifyEmail;
