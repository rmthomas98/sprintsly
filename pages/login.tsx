import Head from "next/head";
import { LoginForm } from "../components/Login/LoginForm";

const Login = () => {
  return (
    <>
      <Head>
        <title>Sprintsly | Log in</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
