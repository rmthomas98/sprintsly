import Head from "next/head";
import { LoginForm } from "../components/Login/LoginForm";
import { useRouter } from "next/router";
import { useTheme } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const Login = ({ newAccount }: any) => {
  const { isDark } = useTheme();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  const accountCreated = () =>
    toast.success("Your account has been created. You can now login below.", {
      style: toastStyle,
    });

  useEffect(() => {
    if (newAccount) accountCreated();
  }, []);

  return (
    <>
      <Head>
        <title>Sprintsly | Log in</title>
      </Head>
      <Toaster />
      <LoginForm />
    </>
  );
};

Login.getInitialProps = ({ query }: any) => {
  const { newAccount } = query;
  return { newAccount };
};

export default Login;
