import { getSession, useSession } from "next-auth/react";

const Index = () => {
  const { data } = useSession();
  console.log(data);
  return <div></div>;
};

export default Index;
