import styles from "./VerifyEmailForm.module.scss";
import {
  Text,
  Button,
  Input,
  Spacer,
  Loading,
  Link,
  useTheme,
} from "@nextui-org/react";
import { FaUserSecret } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export const VerifyEmailForm = ({ email }: any) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const router = useRouter();
  const { isDark } = useTheme();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const onSubmit = async (data: any): Promise<void> => {
    setIsLoading(true);
    const info = { email, secretCode: data.secretCode };
    const response = await axios.post("/api/signup/verify-email", info);

    switch (response.data) {
      case "success":
        router.push({ pathname: "/login", query: { newAccount: true } });
        break;
      case "email not found":
        setIsLoading(false);
        setError("email");
        break;
      case "incorrect":
        setIsLoading(false);
        setError("code");
    }
  };

  const resendEmail = async (): Promise<void> => {
    if (resendLoading) return;
    setResendLoading(true);
    const loadingToast = toast.loading("Sending email", {
      style: toastStyle,
    });
    const response = await axios.post("/api/signup/resend-email", { email });

    if (response.data === "success") {
      setResendLoading(false);
      toast.success("Email sent!", { id: loadingToast, style: toastStyle });
    } else {
      setResendLoading(false);
      toast.error("An error has occurred.", {
        id: loadingToast,
        style: toastStyle,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Toaster />
      <div className={styles.container}>
        <Text h2 className={styles.header}>
          Verify your email
        </Text>
        <Spacer y={0.3} />
        <Text
          className={styles.description}
          weight="medium"
          css={{ color: "$accents8" }}
          size={15}
        >
          You&#39;re almost finished setting up your account. Check your inbox
          for the secret code we emailed you and enter it below.
        </Text>
        <Spacer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            size="md"
            placeholder="Secret code"
            bordered
            fullWidth
            contentLeft={<FaUserSecret />}
            {...register("secretCode", { required: true })}
          />
          <Text
            color="error"
            css={{
              position: "absolute",
              marginTop: 1,
              opacity: errors.secretCode ? 1 : 0,
              transition: "300ms",
              pointerEvents: "none",
            }}
            weight="semibold"
            size={12}
          >
            * Please enter your secret code
          </Text>
          <Text
            color="error"
            css={{
              position: "absolute",
              marginTop: 1,
              opacity: error === "email" ? 1 : 0,
              transition: "300ms",
              pointerEvents: "none",
            }}
            weight="semibold"
            size={12}
          >
            * User not found
          </Text>
          <Text
            color="error"
            css={{
              position: "absolute",
              marginTop: 1,
              opacity: error === "code" ? 1 : 0,
              transition: "300ms",
              pointerEvents: "none",
            }}
            weight="semibold"
            size={12}
          >
            * Incorrect code
          </Text>
          <Spacer y={1.2} />
          <Button type="submit" css={{ width: "100%" }} disabled={isLoading}>
            {isLoading ? <Loading size="sm" /> : "Verify email"}
          </Button>
        </form>
        <Spacer />
        <Link
          onClick={resendEmail}
          css={{
            fontSize: 13,
            fontWeight: "$medium",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          color="text"
        >
          {resendLoading ? <Loading size="xs" /> : "Resend email"}
        </Link>
      </div>
    </div>
  );
};
