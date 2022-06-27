import { Button, Card, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import styles from "./Plan.module.scss";

export const Plan = ({ user }: any) => {
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    const { type } = user.subscription;
    const { tier } = user.subscription;
    const { quantity } = user.subscription;

    if (tier === "FREE") {
      setPrice("$0.00");
    } else if (type === "TEAMS" && tier === "PRO") {
      setPrice(`$${quantity * 7}.00`);
    } else {
      setPrice("$5.00");
    }
  });

  return (
    <Card>
      <Card.Header>
        <Text h4 weight="medium">
          Your Plan
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Card variant="bordered" css={{ maxWidth: 300 }}>
          <Card.Header>
            <Text h5 weight="semibold" css={{ textTransform: "capitalize" }}>
              {user.subscription.type.toLowerCase()}
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text
              size={14}
              weight="medium"
              css={{ textTransform: "capitalize" }}
            >
              {user.subscription.tier.toLowerCase()}
            </Text>
            <Text h3>
              {price}
              <Text span small>
                {" "}
                / month
              </Text>
            </Text>
          </Card.Body>
        </Card>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <div className={styles.footerContainer}>
          <Text size={14} css={{ color: "$accents8" }} weight="medium">
            Update subscription
          </Text>
          <div className={styles.btnContainer}>
            <Button size="sm" color="error" css={{ mr: "$4" }} flat auto>
              Cancel
            </Button>
            <Button size="sm" auto shadow>
              Change
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};
