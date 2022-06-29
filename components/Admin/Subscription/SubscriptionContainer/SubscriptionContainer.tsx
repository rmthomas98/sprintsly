import styles from "./SubscriptionContainer.module.scss";
import { Text, Spacer } from "@nextui-org/react";
import { Plan } from "../Plan/Plan";
import { Toaster } from "react-hot-toast";
import { PaymentMethod } from "../PaymentMethod/PaymentMethod";
import { Invoices } from "../Invoices/Invoices";

export const SubscriptionContainer = ({ user }: any) => {
  return (
    <>
      <Toaster />
      <div className={styles.container}>
        <Text h3>Your Subscription</Text>
        <Spacer y={0.4} />
        <div className={styles.flexContainer}>
          <Plan user={user} />
          <Spacer />
          <PaymentMethod user={user} />
        </div>
        <Spacer />
        <Invoices user={user} />
      </div>
    </>
  );
};
