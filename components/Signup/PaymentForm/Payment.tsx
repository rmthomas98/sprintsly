import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Spacer, Loading, useTheme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface Props {
  accountInfo: any;
}

export const Payment = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { isDark } = useTheme();

  const error = () =>
    toast.error("An error has occured", {
      duration: 5000,
      style: {
        background: isDark ? "#ECEDEE" : "#16181A",
        color: isDark ? "#000" : "#fff",
        fontSize: 14,
        fontWeight: 500,
      },
    });

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const setupIntent = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (setupIntent.error) {
      error();
      setIsLoading(false);
    }

    const response = await axios.post(
      `/api/signup/${
        props.accountInfo.plan === "teams" ? "team-signup" : "personal-signup"
      }`,
      { setupIntent, accountInfo: props.accountInfo }
    );

    if (response.data === "success") {
      router.push({
        pathname: "/verify-email",
        query: { email: props.accountInfo.email },
      });
    } else {
      error();
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isLoaded && (
        <div
          style={{
            height: 400,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading size="xl" />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          opacity: isLoaded ? 1 : 0,
          position: isLoaded ? "unset" : "absolute",
          top: 0,
          zIndex: -1,
          transition: "1s",
        }}
      >
        <PaymentElement />
        <Spacer />
        <Button
          css={{ width: "100%" }}
          color="gradient"
          shadow
          type="submit"
          onClick={handleSubmit}
          disabled={!stripe || isLoading}
        >
          {isLoading ? <Loading size="sm" /> : "Create account"}
        </Button>
      </form>
    </div>
  );
};
