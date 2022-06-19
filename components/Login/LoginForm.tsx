import styles from "./LoginForm.module.scss";
import Image from "next/image";
import { Text, Input, Button, Checkbox, Spacer, Link } from "@nextui-org/react";
import { BiUser, BiLockAlt, BiLockOpenAlt } from "react-icons/bi";
import NextLink from "next/link";

export const LoginForm = () => {
  return (
    <div className={styles.wrapper}>
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
          contentLeft={<BiUser />}
          color="primary"
          bordered
          size="lg"
          fullWidth
          placeholder="Email or username"
        />
        <Spacer />
        <Input.Password
          contentLeft={<BiLockAlt />}
          color="primary"
          bordered
          size="lg"
          fullWidth
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
        <Button shadow css={{ width: "100%" }} size="lg" color="gradient">
          Log in
        </Button>
      </div>
    </div>
  );
};
