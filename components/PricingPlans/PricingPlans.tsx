import styles from "./PricingPlans.module.scss";
import {
  Card,
  Text,
  Button,
  Switch,
  Checkbox,
  Row,
  Divider,
  Spacer,
} from "@nextui-org/react";
import { BiCheck } from "react-icons/bi";

export const PricingPlans = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <Card isHoverable css={{ padding: "$8" }}>
            <Text size={14}>Free</Text>
          </Card>
          <Spacer />
          <Card isHoverable css={{ padding: "$8" }}>
            <Text>Free</Text>
          </Card>
        </div>
      </div>
    </div>
  );
};
