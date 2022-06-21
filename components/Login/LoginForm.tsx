import styles from "./LoginForm.module.scss";
import Image from "next/image";
import { Text, Input, Button, Checkbox, Spacer, Link } from "@nextui-org/react";
import { BiUser, BiLockAlt, BiEnvelope } from "react-icons/bi";
import NextLink from "next/link";
import { signIn, useSession } from "next-auth/react";

export const LoginForm = () => {
  const { data } = useSession();

  console.log(data);
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
        <Input
          contentLeft={<BiEnvelope />}
          color="primary"
          bordered
          size="lg"
          fullWidth
          type="email"
          placeholder="Email"
        />
        <Spacer />
        <Input.Password
          contentLeft={<BiLockAlt />}
          color="primary"
          bordered
          size="lg"
          fullWidth
          type="password"
          placeholder="Password"
        />
        <Spacer />
        <div className={styles.flexContainer}>
          <Checkbox size="sm">Remember me</Checkbox>
          <NextLink href="/">
            <Link color="text" css={{ fontSize: 14 }}>
              Forgot password?
            </Link>
          </NextLink>
        </div>
        <Spacer />
        <Button
          onClick={() => signIn()}
          shadow
          css={{ width: "100%" }}
          size="lg"
          color="gradient"
        >
          Log in
        </Button>
      </div>
    </div>
  );
};
