import styles from "./PaymentMethod.module.scss";
import { Card, Text, Button, Spacer } from "@nextui-org/react";
import { PaymentMethodModal } from "./PaymentMethodModal";
import { useState } from "react";
import visa from "../../../../public/images/visa.png";
import mastercard from "../../../../public/images/mastercard.png";
import discover from "../../../../public/images/discover.png";
import americanExpress from "../../../../public/images/american-express.png";
import Image from "next/image";

export const PaymentMethod = ({ user }: any) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
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
            <Card.Header css={{ py: "$5" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {user.card.brand === "visa" && (
                  <Image src={visa} width={32} height={32} alt="visa" />
                )}
                {user.card.brand === "mastercard" && (
                  <Image
                    src={mastercard}
                    width={32}
                    height={32}
                    alt="mastercard"
                  />
                )}
                {user.card.brand === "discover" && (
                  <Image src={discover} width={32} height={32} alt="discover" />
                )}
                {user.card.brand === "amex" && (
                  <Image
                    src={americanExpress}
                    width={32}
                    height={32}
                    alt="american express"
                  />
                )}
                <Text
                  h5
                  size={18}
                  css={{
                    textTransform: "capitalize",
                    ml: "$4",
                  }}
                >
                  {user.card.brand}
                </Text>
              </div>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Text size={16} weight="semibold">
                **** {user.card.last4}
              </Text>
              <Text size={14} weight="semibold">
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
            <Button
              auto
              size="sm"
              css={{ width: 81 }}
              shadow
              onClick={() => setIsActive(!isActive)}
            >
              Update
            </Button>
          </div>
        </Card.Footer>
      </Card>
      <PaymentMethodModal
        user={user}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </>
  );
};
