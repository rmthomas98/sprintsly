import styles from "./SubscriptionContainer.module.scss";
import { Text, Spacer } from "@nextui-org/react";
import { Plan } from "../Plan/Plan";
import { Toaster } from "react-hot-toast";

export const SubscriptionContainer = ({ user }: any) => {
  return (
    <>
      <Toaster />
      <div className={styles.container}>
        <Text h3>Your Subscription</Text>
        <Spacer y={0.4} />
        <div className={styles.flexContainer}>
          <Plan user={user} />
        </div>
      </div>
    </>
  );
};
