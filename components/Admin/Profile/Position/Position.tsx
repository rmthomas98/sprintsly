import styles from "./Position.module.scss";
import { Text, Card, Input, Button } from "@nextui-org/react";
import { BiShield } from "react-icons/bi";
import { useState } from "react";

export const Position = ({ user }: any) => {
  const [position, setPosition] = useState(user.position || null);
  return (
    <Card>
      <Card.Header>
        <Text h4 weight="medium">
          Your position
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Input
          type="text"
          placeholder="Sales, finance, etc."
          shadow
          bordered
          contentLeft={<BiShield />}
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <div className={styles.footerContainer}>
          <Text size={14} weight="medium" css={{ color: "$accents8" }}>
            Update your position
          </Text>
          <Button size="sm" shadow disabled>
            Update
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
