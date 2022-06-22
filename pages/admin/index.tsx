import { useSession } from "next-auth/react";

const Index = () => {
  const { data } = useSession();
  console.log(data);
  return <div>welcome to admin</div>;
};

export default Index;
