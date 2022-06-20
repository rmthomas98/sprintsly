import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Payment } from "./Payment";
import { Text, Card, Spacer, useTheme } from "@nextui-org/react";
import styles from "./PaymentForm.module.scss";

interface Props {
  accountInfo: any;
  setAccountInfo: any;
}

const stripePromise = loadStripe(
  "pk_test_51LC8wPA7aOT5A0f22AH6sxL2nx9nV3oV9d5Tt9NU4a7UZkvNA7WRIHsQeXAUSj6rKDKL8bV42qyHRziVpzHGPWxK00Rah2MXOz"
);

const getClientSecret = async (): Promise<string> => {
  const response = await axios.get("/api/signup/setup-intent");
  return response.data;
};

export const Provider = (props: Props) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const { isDark } = useTheme();

  useEffect(() => {
    const getCredentials = async () => {
      const credentials = await getClientSecret();
      setClientSecret(credentials);
    };
    getCredentials();
  }, []);

  const options = {
    clientSecret: clientSecret,
    appearance: {
      variables: {
        fontFamily: '"Gilroy", sans-serif',
        colorDanger: "#F31260",
      },
      rules: {
        ".Input": {
          backgroundColor: "transparent",
          borderRadius: "14px",
          border: isDark ? "2px solid #313538" : "2px solid #DFE3E6",
          color: isDark ? "#ecedee" : "#000",
          fontSize: "14px",
        },
        ".Input:hover": {
          boxShadow: "none",
          border: isDark ? "2px solid #fff" : "2px solid #000",
        },
        ".Input:focus": {
          boxShadow: "none",
          border: isDark ? "2px solid #fff" : "2px solid #000",
        },
        ".Label": {
          color: isDark ? "#ecedee" : "#000",
        },
      },
    },
  };

  if (!clientSecret) return <div></div>;

  return (
    <div className={styles.fade}>
      <Card
        css={{ px: "$8", py: "$4", zIndex: "$1", position: "relative" }}
        isHoverable
      >
        <Card.Body css={{ padding: "$4", py: "$8" }}>
          <div className={styles.cardFlexContainer}>
            <div>
              <Text h4 css={{ textTransform: "capitalize" }}>
                {props.accountInfo.plan}
              </Text>

              <Text
                weight="semibold"
                size={14}
                css={{ textTransform: "capitalize", color: "$accents8" }}
              >
                sprintsly {props.accountInfo.tier}
              </Text>
            </div>

            <Text h2>
              {props.accountInfo.plan === "teams" &&
              props.accountInfo.tier === "pro"
                ? "$7.00"
                : props.accountInfo.plan === "personal" &&
                  props.accountInfo.tier === "pro"
                ? "$5.00"
                : "$0.00"}
              <Text span small>
                {" "}
                {props.accountInfo.plan === "teams" &&
                props.accountInfo.tier === "pro"
                  ? "/user/month"
                  : "/month"}
              </Text>
            </Text>
          </div>
        </Card.Body>
      </Card>
      <Spacer />
      <Elements options={options} stripe={stripePromise}>
        <Payment accountInfo={props.accountInfo} />
      </Elements>
    </div>
  );
};
