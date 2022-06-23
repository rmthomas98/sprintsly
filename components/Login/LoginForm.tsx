import styles from "./LoginForm.module.scss";
import Image from "next/image";
import {
  Text,
  Input,
  Button,
  Checkbox,
  Spacer,
  Link,
  Loading,
  useTheme,
} from "@nextui-org/react";
import { BiLockAlt, BiEnvelope } from "react-icons/bi";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const { isDark } = useTheme();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  const onSubmit = async (data: any): Promise<void> => {
    setIsLoading(true);
    const loadingToast = toast.loading("Loggin in...", { style: toastStyle });
    const options = {
      redirect: false,
      email: data.email,
      password: data.password,
    };
    const response: any = await signIn("credentials", options);

    if (response?.error) {
      setIsLoading(false);
      toast.error(response.error, { id: loadingToast, style: toastStyle });
      return;
    }
    setIsLoading(false);
    toast.dismiss(loadingToast);
    router.push("/admin");
  };

  return (
    <div className={`${styles.wrapper} ${styles.fade}`}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/transparent-logo.png"
            alt="sprintsly logo"
            height={60}
            width={60}
            className={styles.birdImage}
          />
        </div>
        <Spacer y={0.5} />
        <Text h2 css={{ textAlign: "center" }}>
          Log in to your account
        </Text>
        <Spacer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            contentLeft={<BiEnvelope />}
            color="primary"
            bordered
            size="lg"
            fullWidth
            type="email"
            placeholder="Email"
            aria-label="email"
            {...register("email", { required: true })}
          />
          <Spacer />
          <Input.Password
            contentLeft={<BiLockAlt />}
            color="primary"
            aria-label="password"
            bordered
            size="lg"
            fullWidth
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <Spacer />
          {/* <div className={styles.flexContainer}>
            <Checkbox size="sm">
              Remember me
            </Checkbox>
            <div></div>
            <NextLink href="/">
              <Link color="text" css={{ fontSize: 14 }}>
                Forgot password?
              </Link>
            </NextLink>
          </div> */}
          {/* <Spacer /> */}
          <Button
            type="submit"
            disabled={isLoading}
            shadow
            css={{ width: "100%" }}
            size="lg"
            color="gradient"
          >
            {isLoading ? <Loading size="sm" /> : "Log in"}
          </Button>
          {/* <Button onClick={() => signOut()} /> */}
        </form>
        <Spacer />
        <NextLink href="/">
          <Link
            color="text"
            css={{
              textAlign: "center",
              fontWeight: "$medium",
              fontSize: 14,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Forgot your password?
          </Link>
        </NextLink>
      </div>
    </div>
  );
};
