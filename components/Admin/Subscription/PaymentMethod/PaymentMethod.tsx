import styles from "./PaymentMethod.module.scss";
import { Card, Text, Button, Spacer } from "@nextui-org/react";

export const PaymentMethod = ({ user }: any) => {
  console.log(user);
  return (
    <Card>
      <Card.Header>
        <Text h4 weight="medium">
          Your payment method
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <Card
          variant="bordered"
          style={{ maxWidth: 300, height: "100%", minHeight: 158 }}
        >
          <Card.Header>
            <Text h5 size={18} css={{ textTransform: "capitalize" }}>
              {user.card.brand}
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Text size={16} weight="medium">
              **** {user.card.last4}
            </Text>
            <Text size={14} weight="medium">
              Exp -{" "}
              {`${user.card.month.toString().padStart(2, 0)} / ${
                user.card.year
              }`}
            </Text>
            {user.customer.paymentStatus === "FAILED" && (
              <>
                <Spacer y={0.4} />
                <Text color="error" size={14} weight="semibold">
                  Your payment has failed, please update your payment method.
                </Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <div className={styles.footerContainer}>
          <Text size={14} weight="medium" css={{ color: "$accents8" }}>
            Update payment method
          </Text>
          <Button auto size="sm" css={{ width: 81 }} shadow>
            Update
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
