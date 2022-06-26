import { ProfileContainer } from "../../components/Admin/Profile/ProfileContainer/ProfileContainer";
import { Spacer, Text } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import { prisma } from "../../lib/db";

const MyProfile = ({ user }: any) => {
  return (
    <div>
      <ProfileContainer user={user} />
    </div>
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
  let user: any = await prisma.user.findUnique({ where: { id } });

  user = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    image: user?.image,
    username: user?.username,
    position: user?.position || null,
  };

  return {
    props: {
      user,
    },
  };
};

export default MyProfile;
