import {
  Button,
  Card,
  Loading,
  Text,
  useTheme,
  Spacer,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./Plan.module.scss";
import { useRouter } from "next/router";
import { PlanModal } from "./PlanModal/PlanModal";
import { format } from "date-fns";

export const Plan = ({ user }: any) => {
  const [price, setPrice] = useState<string>("");
  const [periodEndLoading, setPeriodEndLoading] = useState<boolean>(false);
  const [periodEndModal, setPeriodEndModal] = useState<boolean>(false);
  const [periodEnd, setPeriodEnd] = useState<boolean>(
    !user.subscription.cancelAtPeriodEnd
  );
  const { isDark } = useTheme();
  const router = useRouter();

  const toastStyle: any = {
    background: isDark ? "#ECEDEE" : "#16181A",
    color: isDark ? "#16181A" : "#ECEDEE",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
  };

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

  const handlePeriodEnd = async (periodEndAction: boolean): Promise<void> => {
    setPeriodEndLoading(true);
    const options: {
      id: number;
      periodEndAction: boolean;
      subscriptionId: string;
    } = {
      id: user.subscription.id,
      periodEndAction,
      subscriptionId: user.subscription.subscriptionId,
    };
    const response = await axios.post(
      "/api/admin/subscription/period-end",
      options
    );
    if (response.status === 200) {
      setPeriodEndLoading(false);
      setPeriodEndModal(false);
      setPeriodEnd(!periodEnd);
      toast.success(response.data, { style: toastStyle, duration: 5000 });
      router.replace(router.asPath);
    } else {
      setPeriodEndLoading(false);
      toast.error(response.data, { style: toastStyle, duration: 5000 });
    }
  };

  return (
    <>
      <PlanModal
        periodEndLoading={periodEndLoading}
        periodEndModal={periodEndModal}
        setPeriodEndModal={setPeriodEndModal}
        handlePeriodEnd={handlePeriodEnd}
        periodEnd={periodEnd}
      />
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
              <Text
                h5
                size={18}
                weight="semibold"
                css={{ textTransform: "capitalize" }}
              >
                {user.subscription.type.toLowerCase()}
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <>
                <Text
                  size={16}
                  weight="medium"
                  css={{ textTransform: "capitalize" }}
                >
                  {user.subscription.tier.toLowerCase()}
                </Text>
              </>
              {user.subscription.quantity > 1 ||
                (user.subscription.type === "TEAMS" && (
                  <Text size={14} weight="medium">{`${
                    user.subscription.quantity
                  } ${
                    user.subscription.quantity > 1
                      ? "Team members"
                      : "Team member"
                  }`}</Text>
                ))}
              <Text h3>
                {price}
                <Text span small>
                  {" "}
                  / month
                </Text>
              </Text>
              {user.subscription.cancelAtPeriodEnd && (
                <>
                  <Spacer y={0.4} />
                  <Text color="error" size={14} weight="semibold">
                    Downgrades to free on{" "}
                    {format(
                      new Date(user.subscription.nextInvoice * 1000),
                      "MMMM dd, yyyy"
                    )}
                  </Text>
                </>
              )}
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
              {user.subscription.tier === "PRO" &&
                !user.subscription.cancelAtPeriodEnd && (
                  <Button
                    onClick={() => setPeriodEndModal(true)}
                    size="sm"
                    color="error"
                    css={{ mr: "$4", width: 85 }}
                    flat
                    auto
                    disabled={periodEndLoading}
                  >
                    {periodEndLoading ? <Loading size="xs" /> : "Cancel"}
                  </Button>
                )}
              {user.subscription.tier === "PRO" &&
                user.subscription.cancelAtPeriodEnd && (
                  <Button
                    onClick={() => setPeriodEndModal(true)}
                    size="sm"
                    color="primary"
                    css={{ mr: "$4", width: 85 }}
                    flat
                    auto
                    disabled={periodEndLoading}
                  >
                    {periodEndLoading ? <Loading size="xs" /> : "Renew"}
                  </Button>
                )}
              <Button size="sm" auto shadow css={{ width: 85 }}>
                Change
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};
