import styles from "./SignupContainer.module.scss";
import { SignupForm } from "../SignupForm/SignupForm";
import { Spacer, Text } from "@nextui-org/react";

export const SignupContainer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Text h2 className={styles.header}>
          Get started with{" "}
          <Text
            span
            weight="bold"
            css={{
              textGradient: "45deg, $pink700 , $blue600 100%",
            }}
          >
            Sprintsly
          </Text>
        </Text>
        <Spacer />

        <SignupForm />
      </div>
    </div>
  );
};
