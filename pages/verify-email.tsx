import { VerifyEmailForm } from "../components/VerifyEmail/VerifyEmailForm";
import Head from "next/head";

const VerifyEmail = ({ email }: any) => {
  return (
    <>
      <Head>
        <title>Sprintsly | Verify Email</title>
      </Head>
      <VerifyEmailForm email={email} />
    </>
  );
};

VerifyEmail.getInitialProps = async ({ query }: any) => {
  const { email } = query;
  return { email };
};

export default VerifyEmail;
