import { Text, Modal, useTheme, Loading } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { PaymentMethodElement } from "./PaymentMethodElement";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LC8wPA7aOT5A0f22AH6sxL2nx9nV3oV9d5Tt9NU4a7UZkvNA7WRIHsQeXAUSj6rKDKL8bV42qyHRziVpzHGPWxK00Rah2MXOz"
);

export const PaymentMethodModal = ({ user, isActive, setIsActive }: any) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const { isDark } = useTheme();

  // get client secret from stripe
  useEffect(() => {
    const getCredentials = async () => {
      const response = await axios.get(
        "/api/admin/payment-method/get-client-secret"
      );
      setClientSecret(response.data.clientSecret);
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

  return (
    <Modal
      css={{ maxWidth: 500, py: "$6", pb: "$0" }}
      width="500px"
      open={isActive}
      onClose={() => setIsActive(false)}
    >
      <Modal.Header>
        <Text h3>Update payment method</Text>
      </Modal.Header>
      <Modal.Body>
        <Elements options={options} stripe={stripePromise}>
          <PaymentMethodElement user={user} setIsActive={setIsActive} />
        </Elements>
      </Modal.Body>
    </Modal>
  );
};
