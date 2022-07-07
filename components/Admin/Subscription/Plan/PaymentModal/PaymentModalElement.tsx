import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import {
  Spacer,
  Button,
  Loading,
  Row,
  Modal,
  useTheme,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export const PaymentModalElement = ({ setIsActive, selectedPlan }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isDark } = useTheme();
  const router = useRouter();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

  const onSubmit = async () => {
    setIsLoading(true);

    if (!stripe || !elements) return;

    const session: any = await getSession();

    const setupCard: any = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (setupCard.error) {
      // show error message
      toast.error(setupCard.error.message, { style: toastStyle });
      setIsLoading(false);
      return;
    }

    const response = await axios.post("/api/admin/subscription/pro-upgrade", {
      id: session.id,
      selectedPlan,
      paymentMethodId: setupCard.setupIntent.payment_method,
    });

    if (response.data === "success") {
      setIsActive(false);
      setIsLoading(false);
      toast.success("Subscription updated successfully!", {
        style: toastStyle,
      });
      router.replace(router.asPath);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.", {
        style: toastStyle,
      });
    }
  };

  return (
    <div>
      <PaymentElement />
      <Spacer y={0.5} />
      <Modal.Footer
        css={{
          px: "$0",
        }}
      >
        <Row justify="flex-end">
          <Button
            color="error"
            flat
            auto
            css={{ width: "100%" }}
            onClick={() => setIsActive(false)}
          >
            Close
          </Button>
          <Spacer x={0.6} />
          <Button
            type="submit"
            shadow
            auto
            css={{ width: "100%" }}
            onClick={onSubmit}
            disabled={!stripe || isLoading}
          >
            {isLoading ? <Loading size="xs" /> : "Confirm"}
          </Button>
        </Row>
      </Modal.Footer>
    </div>
  );
};
