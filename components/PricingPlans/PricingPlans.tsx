import styles from "./PricingPlans.module.scss";
import { Row, Button, Text } from "@nextui-org/react";
import { useState } from "react";
import { Personal } from "./Personal";
import { Teams } from "./Teams";

export const PricingPlans = () => {
  const [plans, setPlans] = useState<string>("personal");

  const backgroundFill = {
    background: "$primary",
    color: "#fff",
    width: 100,
  };

  const noFill = {
    width: 100,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Text h2 className={styles.header}>
          Choose the right plan for{" "}
          <Text
            span
            weight="bold"
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
          >
            you
          </Text>
        </Text>
        <Row justify="center" align="center" css={{ mb: "$16" }}>
          <Button.Group bordered color="primary" size="md">
            <Button
              onClick={() => setPlans("personal")}
              css={plans === "personal" ? backgroundFill : noFill}
            >
              Personal
            </Button>
            <Button
              onClick={() => setPlans("teams")}
              css={plans === "teams" ? backgroundFill : noFill}
            >
              Teams
            </Button>
          </Button.Group>
        </Row>
        {/* <Text
          className={styles.description}
          size={14}
          weight="medium"
          css={{ textAlign: "center", marginBottom: 30, maxWidth: 600 }}
        >
          We have a free and pro tier for both the individual and teams plans.
          We like to keep it simple and straightforward here at Sprintsly.
        </Text> */}
        <div className={styles.flexContainer}>
          {plans === "personal" ? <Personal /> : <Teams />}
        </div>
      </div>
    </div>
  );
};
