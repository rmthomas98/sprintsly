import styles from "./SubscriptionContainer.module.scss";
import { Text, Spacer } from "@nextui-org/react";
import { Plan } from "../Plan/Plan";

export const SubscriptionContainer = ({ user }: any) => {
  return (
    <div className={styles.container}>
      <Text h3>Your Subscription</Text>
      <Spacer y={0.4} />
      <div className={styles.flexContainer}>
        <Plan user={user} />
      </div>
    </div>
  );
};
