import { VerifyEmailForm } from "../components/VerifyEmail/VerifyEmailForm";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { setMaxListeners } from "events";
import { useState } from "react";

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
