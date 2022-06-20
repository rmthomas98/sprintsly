import styles from "./VerifyEmailForm.module.scss";
import { Text, Button, Input, Spacer } from "@nextui-org/react";
import { FaUserSecret } from "react-icons/fa";

export const VerifyEmailForm = ({ email }: any) => {
  console.log(email);

  return (
    <div className={styles.wrapper}>
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
          You&#39;re almost finished setting up your account. Look in your inbox
          for the secret code we emailed you and enter it below.
        </Text>
        <Spacer />
        <Input
          size="md"
          placeholder="Secret code"
          bordered
          fullWidth
          contentLeft={<FaUserSecret />}
        />
        <Spacer y={1.2} />
        <Button css={{ width: "100%" }}>Submit</Button>
      </div>
    </div>
  );
};
