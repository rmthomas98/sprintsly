import styles from "./PricingPlans.module.scss";
import { Row, Button, Text, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { PersonalCards } from "./Cards/PersonalCards";
import { TeamsCards } from "./Cards/TeamsCards";
import { PersonalTable } from "./Tables/PersonalTable";
import { TeamsTable } from "./Tables/TeamsTable";
import { Faq } from "./Faq/Faq";

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
        <Text h1 className={styles.header}>
          Choose the right plan for{" "}
          <Text
            span
            weight="extrabold"
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
            }}
          >
            you
          </Text>
        </Text>
        <Spacer />
        {/* <Text
          className={styles.description}
          weight="medium"
          css={{
            textAlign: "center",
            marginBottom: 30,
            maxWidth: 600,
            color: "$accents9",
          }}
        >
          We want to make it as simple as we can. This is why we have a free and
          pro version for personal and team use.
        </Text> */}
        <Row justify="center" align="center">
          <Button.Group bordered color="primary" size="sm">
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
        <Spacer y={2} />
        <div className={styles.flexContainer}>
          {plans === "personal" ? <PersonalCards /> : <TeamsCards />}
        </div>
        <Spacer y={4} />
        {plans === "personal" ? <PersonalTable /> : <TeamsTable />}
        <Spacer y={4} />
        <Faq plans={plans} />
      </div>
    </div>
  );
};
